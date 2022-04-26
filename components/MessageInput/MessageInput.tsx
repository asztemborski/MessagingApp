import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataStore, Auth} from 'aws-amplify';
import {Message, ChatRoom} from '../../src/models';
import Colors from '../../constants/Colors';
import styles from './styles';
import AttachmentsMenu from '../AttachmentsMenu/AttachmentsMenu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

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
          setImageMessage(image.path);
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
          setImageMessage(image.path);
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
  const [imageMessage, setImageMessage] = useState<string | null>(null);

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
    setMessage('');
  };

  const updateLastMessage = async (newMessage: Message) => {
    await DataStore.save(
      ChatRoom.copyOf(chatRoom, updatedChatRoom => {
        updatedChatRoom.LastMessage = newMessage;
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputContainer}>
            {imageMessage && (
              <Pressable
                onLongPress={() => {
                  setImageMessage(null);
                }}>
                <Image
                  source={{uri: imageMessage}}
                  style={styles.imageMessage}
                />
              </Pressable>
            )}
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
        <View style={styles.buttonContainer}>
          {message || imageMessage ? (
            <MaterialIcons
              name={'keyboard-arrow-up'}
              size={30}
              color={Colors.green}
              onPress={sendMessage}
            />
          ) : (
            <Entypo
              name={'plus'}
              size={25}
              color={Colors.green}
              onPress={() => {
                setShowAttachMenu(currentValue => !currentValue);
              }}
            />
          )}
        </View>
      </View>
      {showAttachMenu && <AttachmentsMenu buttons={AttachMenuButtons} />}
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
