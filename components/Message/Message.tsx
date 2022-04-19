import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';
import {Message as MessageModel, User} from '../../src/models';
import {Auth, DataStore} from 'aws-amplify';

interface Props {
  message: MessageModel;
}

const Message: React.FunctionComponent<Props> = ({message}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isMe, setIsMe] = useState<boolean | undefined>(false);

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) return;
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === authUser.attributes.sub);
    };
    checkIfMe();
  }, [user]);

  if (!user) return <ActivityIndicator />;

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
