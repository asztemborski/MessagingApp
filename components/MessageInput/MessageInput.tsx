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

interface Props {
  chatRoom: ChatRoom;
}

const MessageInput: React.FunctionComponent<Props> = ({chatRoom}) => {
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
      onPress: () => {
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

  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [imageMessage, setImageMessage] = useState<ImageOrVideo | null>(null);
  const [progress, setProgress] = useState(0);

  const onSendPressed = () => {
    if (imageMessage) {
      sendImageOrVideo(imageMessage);
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

  type Progress = {
    loaded: number;
    total: number;
  };

  const progressCallback = (progress: Progress) => {
    setProgress((progress.loaded / progress.total) * 100);
  };

  const sendImage = async () => {
    const blob = await getImageOrVideoBlob();
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
    const blob = await getImageOrVideoBlob();
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
  };

  const getImageOrVideoBlob = async () => {
    if (!imageMessage) return null;

    const response = await fetch(imageMessage.path);
    const blob = await response.blob();
    return blob;
  };

  const SendButton = () => {
    if (progress > 0) {
      return <ActivityIndicator color={Colors.green} />;
    } else if (message || imageMessage) {
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputContainer}>
            {imageMessage ? (
              <Pressable
                onLongPress={() => {
                  setImageMessage(null);
                }}>
                <Image
                  source={{uri: imageMessage.path}}
                  style={styles.imageMessage}
                />
              </Pressable>
            ) : null}
            <TextInput
              style={styles.textInput}
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
              style={{alignSelf: 'flex-end', bottom: 10}}
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
