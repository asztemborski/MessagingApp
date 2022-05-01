import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';
import {Message as MessageModel, User} from '../../src/models';
import {Auth, DataStore} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';

interface Props {
  message: MessageModel;
}

const Message: React.FunctionComponent<Props> = ({message}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isMe, setIsMe] = useState<boolean | undefined | null>(null);

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

  if (!user) return null;

  return (
    <View style={[styles.container]}>
      {!isMe && !message.prevMsgSameOwner ? (
        <Image
          source={{
            uri: user.imageUri,
          }}
          style={styles.image}
        />
      ) : (
        <View style={styles.image} />
      )}
      <View
        style={[
          styles.textContainer,
          {
            backgroundColor: isMe ? Colors.green : Colors.darkGray,
            marginVertical: message.prevMsgSameOwner ? 2 : 10,
            marginBottom: 2,
            marginLeft: isMe ? 'auto' : 10,
          },
        ]}>
        {message.image ? (
          <S3Image
            imgKey={message.image}
            style={{
              width: '100%',
              aspectRatio: 4 / 3,
              marginBottom: message.content != '' ? 10 : 0,
              borderRadius: 5,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {!!message.content && (
          <Text style={styles.text}>{message.content}</Text>
        )}
      </View>
    </View>
  );
};

export default Message;
