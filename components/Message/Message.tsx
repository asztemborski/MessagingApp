import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';
import {Message as MessageModel, User} from '../../src/models';
import {Auth, DataStore} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';
import {Storage} from 'aws-amplify';
import Video from 'react-native-video';

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

  const messageContent = () => {
    if (message.image) {
      return (
        <S3Image
          imgKey={message.image}
          style={{
            width: '100%',
            aspectRatio: 4 / 3,
            borderRadius: 5,
          }}
          resizeMode={'contain'}
        />
      );
    } else if (message.video) {
      return (
        <Video
          source={{
            uri: 'http://videocdn.bodybuilding.com/video/mp4/62000/62792m.mp4',
          }}
          style={{width: '100%', borderRadius: 5, aspectRatio: 4 / 3}}
        />
      );
    } else {
      return <Text style={styles.text}>{message.content}</Text>;
    }
  };

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
          !!message.image && {
            padding: 0,
          },
        ]}>
        {messageContent()}
      </View>
    </View>
  );
};

export default Message;
