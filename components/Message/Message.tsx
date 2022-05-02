import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';
import {Message as MessageModel, User} from '../../src/models';
import {Auth, DataStore} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';
import {Storage} from 'aws-amplify';
import {Video} from 'expo-av';
import VoiceMessagePlayer from '../VoiceMessagePlayer/VoiceMessagePlayer';

interface Props {
  message: MessageModel;
}

const Message: React.FunctionComponent<Props> = ({message}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isMe, setIsMe] = useState<boolean | undefined | null>(null);
  const [soundUri, setSoundUri] = useState<any>(null);
  const [videoUri, setVideoUri] = useState<any>(null);

  const video = useRef(null);

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    if (message.audio) {
      Storage.get(message.audio).then(setSoundUri);
    }

    if (message.video) {
      Storage.get(message.video).then(setVideoUri);
    }
  }, [message]);

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
    } else if (soundUri) {
      <VoiceMessagePlayer
        soundUri={soundUri}
        styleRoot={{backgroundColor: 'red'}}
      />;
    } else if (message.video) {
      return (
        <Video
          source={{
            uri: videoUri,
          }}
          ref={video}
          style={{width: '100%', borderRadius: 5, aspectRatio: 4 / 3}}
          useNativeControls
          isLooping
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
      {soundUri ? (
        <VoiceMessagePlayer
          soundUri={soundUri}
          styleRoot={{
            backgroundColor: isMe ? Colors.green : Colors.darkGray,
            width: '60%',
            marginLeft: isMe ? 'auto' : 10,
            marginVertical: message.prevMsgSameOwner ? 2 : 10,
          }}
          iconsColor={isMe ? Colors.background : Colors.green}
          styleAudioProgressFG={{
            backgroundColor: isMe ? Colors.background : Colors.green,
          }}
        />
      ) : (
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
      )}
    </View>
  );
};

export default Message;
