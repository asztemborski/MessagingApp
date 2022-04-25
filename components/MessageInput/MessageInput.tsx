import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataStore, Auth} from 'aws-amplify';
import {Message, ChatRoom} from '../../src/models';
import Colors from '../../constants/Colors';
import styles from './styles';
import EmojiSelector from 'react-native-emoji-selector';

interface Props {
  chatRoom: ChatRoom;
}

const MessageInput: React.FunctionComponent<Props> = ({chatRoom}) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpened, setIsEmojiPickerOpened] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShow(false);
    });
  });

  useEffect(() => {
    if (isEmojiPickerOpened === true) Keyboard.dismiss();
  });

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
    setIsEmojiPickerOpened(false);
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
      style={[styles.container, {height: isEmojiPickerOpened ? '50%' : 'auto'}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{color: 'white', flex: 1}}
            placeholder={'Type your message'}
            placeholderTextColor={'grey'}
            value={message}
            onChangeText={setMessage}
          />
          <View
            style={{
              position: 'absolute',
              width: 22,
              borderRadius: 10,
              height: 22,
              backgroundColor: Colors.green,
              right: 12.7,
            }}
          />
          <FontAwesome5
            name={'smile'}
            size={28}
            color={Colors.darkGray}
            onPress={() => {
              setIsEmojiPickerOpened(currentValue => !currentValue);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          {message ? (
            <MaterialIcons
              name={'keyboard-arrow-up'}
              size={30}
              color={Colors.green}
              onPress={sendMessage}
            />
          ) : (
            <Entypo name={'plus'} size={25} color={Colors.green} />
          )}
        </View>
      </View>

      {isEmojiPickerOpened && (
        <EmojiSelector
          onEmojiSelected={emoji => {
            setMessage(currentMessage => currentMessage + emoji);
          }}
          showSearchBar={false}
          showHistory={true}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
