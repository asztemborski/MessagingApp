import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';

interface Props {
  message: {
    content: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
    };
  };
}

const myID = 'u1';

const Message: React.FunctionComponent<Props> = ({message}) => {
  const isMe = message.user.id === myID;

  return (
    <View style={styles.container}>
      {!isMe && (
        <Image
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg',
          }}
          style={styles.image}
        />
      )}
      <View
        style={[
          styles.textContainer,
          {
            backgroundColor: isMe ? Colors.green : Colors.darkGray,
            marginLeft: isMe ? 'auto' : 10,
          },
        ]}>
        <Text style={styles.text}>{message.content}</Text>
      </View>
    </View>
  );
};

export default Message;
