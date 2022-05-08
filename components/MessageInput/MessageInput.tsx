import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataStore, Auth, Storage} from 'aws-amplify';
import {Message, ChatRoom} from '../../src/models';
import Colors from '../../constants/Colors';
import styles from './styles';
import AttachmentsMenu from '../AttachmentsMenu/AttachmentsMenu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import {Audio} from 'expo-av';
import VoiceMessagePlayer from '../VoiceMessagePlayer/VoiceMessagePlayer';

interface Props {
  chatRoom: ChatRoom;
}

const MessageInput: React.FunctionComponent<Props> = ({chatRoom}) => {
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [imageMessage, setImageMessage] = useState<ImageOrVideo | null>(null);
  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const [soundUri, setSoundUri] = useState<string | null>(null);

  const onSendPressed = () => {
    if (imageMessage) {
      sendImageOrVideo(imageMessage);
    } else if (soundUri) {
      sendAudio();
    } else if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  const sendMessage = async () => {
    const user = await Auth.currentAuthenticatedUser();

    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      }),
    );

    updateLastMessage(newMessage);
    resetFields();
  };

  const updateLastMessage = async (newMessage: Message) => {
    await DataStore.save(
      ChatRoom.copyOf(chatRoom, updatedChatRoom => {
        updatedChatRoom.LastMessage = newMessage;
      }),
    );
  };

  const onPlusClicked = async () => {
    setShowAttachMenu(currentValue => !currentValue);
  };

  const progressCallback = (progress: {loaded: number; total: number}) => {
    setProgress((progress.loaded / progress.total) * 100);
  };

  const sendImage = async () => {
    if (!imageMessage) return;

    const blob = await getBlob(imageMessage.path);
    const {key} = await Storage.put(`${uuid.v4()}.png`, blob, {
      progressCallback,
    });

    const user = await Auth.currentAuthenticatedUser();

    const newImageMessage = await DataStore.save(
      new Message({
        content: `User sent photo`,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
        image: key,
      }),
    );

    if (message) {
      const newMessage = await DataStore.save(
        new Message({
          content: message,
          userID: user.attributes.sub,
          chatroomID: chatRoom.id,
        }),
      );

      updateLastMessage(newMessage);
    } else {
      updateLastMessage(newImageMessage);
    }

    resetFields();
  };

  const sendVideo = async () => {
    if (!imageMessage) return;

    const blob = await getBlob(imageMessage.path);
    const {key} = await Storage.put(`${uuid.v4()}.mp4`, blob, {
      progressCallback,
    });

    const user = await Auth.currentAuthenticatedUser();

    const newVideoMessage = await DataStore.save(
      new Message({
        content: `User sent video`,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
        video: key,
      }),
    );

    if (message) {
      const newMessage = await DataStore.save(
        new Message({
          content: message,
          userID: user.attributes.sub,
          chatroomID: chatRoom.id,
        }),
      );

      updateLastMessage(newMessage);
    } else {
      updateLastMessage(newVideoMessage);
    }

    resetFields();
  };

  const sendAudio = async () => {
    if (!soundUri) return;

    const uriParts = soundUri.split('.');
    const type = uriParts[uriParts.length - 1];
    const blob = await getBlob(soundUri);
    const {key} = await Storage.put(`${uuid.v4()}.${type}`, blob, {
      progressCallback,
    });

    const user = await Auth.currentAuthenticatedUser();

    const newAudioMessage = await DataStore.save(
      new Message({
        content: `User sent audio message`,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
        audio: key,
      }),
    );

    if (message) {
      const newMessage = await DataStore.save(
        new Message({
          content: message,
          userID: user.attributes.sub,
          chatroomID: chatRoom.id,
        }),
      );

      updateLastMessage(newMessage);
    } else {
      updateLastMessage(newAudioMessage);
    }

    resetFields();
  };

  const sendImageOrVideo = (image: ImageOrVideo | null) => {
    if (!image) return;

    if (image.mime === 'image/jpeg') sendImage();
    if (image.mime === 'video/mp4') sendVideo();
    else return;
  };

  const resetFields = () => {
    setMessage('');
    setImageMessage(null);
    setProgress(0);
    setShowAttachMenu(false);
    setSoundUri(null);
  };

  const getBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const SendButton = () => {
    if (progress > 0) {
      return <ActivityIndicator color={Colors.green} />;
    } else if (message || imageMessage || soundUri) {
      return (
        <MaterialIcons
          name={'keyboard-arrow-up'}
          size={30}
          color={Colors.green}
        />
      );
    } else {
      return <Entypo name={'plus'} size={25} color={Colors.green} />;
    }
  };

  const AttachMenuButtons = [
    {
      name: 'Gallery',
      bgColor: '#399DF8',
      icon: <MaterialIcons name="photo" size={20} color={'white'} />,
      onPress: () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: false,
        }).then(image => {
          setImageMessage(image);
          setShowAttachMenu(false);
        });
      },
    },
    {
      name: 'Camera',
      bgColor: '#F81B68',
      icon: <MaterialIcons name="camera-alt" size={20} color={'white'} />,
      onPress: async () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: false,
        }).then(image => {
          setImageMessage(image);
          setShowAttachMenu(false);
        });
      },
    },
    {
      name: 'Audio',
      bgColor: '#2EC8AD',
      icon: <FontAwesome name="microphone" size={20} color={'white'} />,
      onPressIn: async () => {
        try {
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          const {recording} = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
          );

          setRecording(recording);
        } catch (e) {}
      },
      onPressOut: async () => {
        if (!recording) return;

        setRecording(null);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        setSoundUri(uri);

        if (!uri) return;
      },
    },
    {
      name: 'GIF',
      bgColor: '#F67836',
      icon: <MaterialIcons name="gif" size={40} color={'white'} />,
    },
    {
      name: 'Files',
      bgColor: '#F8B50A',
      icon: <Entypo name="attachment" size={20} color={'white'} />,
    },
    {
      name: 'Location',
      bgColor: '#893AF8',
      icon: <MaterialIcons name="location-pin" size={25} color={'white'} />,
    },
    {
      name: 'Plan',
      bgColor: Colors.lightGreen,
      icon: <MaterialIcons name="event" size={20} color={'white'} />,
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.inputContainer,
            soundUri ? {flexDirection: 'column'} : null,
          ]}>
          {soundUri && <VoiceMessagePlayer soundUri={soundUri} />}
          <View style={{flexDirection: 'row'}}>
            {imageMessage && (
              <Pressable
                onLongPress={() => {
                  setImageMessage(null);
                }}>
                <Image
                  source={{uri: imageMessage.path}}
                  style={styles.imageMessage}
                />
              </Pressable>
            )}
            <TextInput
              style={[styles.textInput, !!soundUri && {}]}
              placeholder={'Type your message'}
              placeholderTextColor={'grey'}
              value={message}
              onChangeText={setMessage}
              multiline={true}
            />
            <View style={styles.emojiIconBackground} />
            <FontAwesome5
              name={'smile'}
              size={28}
              color={Colors.darkGray}
              style={{
                alignSelf: 'flex-end',
                bottom: Platform.OS === 'ios' ? 2.5 : 10,
              }}
            />
          </View>
        </View>
        <Pressable style={styles.buttonContainer} onPress={onSendPressed}>
          {SendButton()}
        </Pressable>
      </View>
      {showAttachMenu && <AttachmentsMenu buttons={AttachMenuButtons} />}
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
