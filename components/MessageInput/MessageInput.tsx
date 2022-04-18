import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataStore, Auth} from 'aws-amplify';
import {Message, ChatRoom} from '../../src/models';
import Colors from '../../constants/Colors';
import styles from './styles';

interface Props {
  chatRoom: ChatRoom;
}

const MessageInput: React.FunctionComponent<Props> = ({chatRoom}) => {
  const [message, setMessage] = useState('');

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
    <View style={styles.container}>
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
        <FontAwesome5 name={'smile'} size={28} color={Colors.darkGray} />
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
  );
};

export default MessageInput;
