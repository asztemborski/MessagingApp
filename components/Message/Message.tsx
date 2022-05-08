import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, useWindowDimensions, View} from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';
import {Message as MessageModel, User} from '../../src/models';
import {Auth, DataStore} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';
import {Storage} from 'aws-amplify';
import VoiceMessagePlayer from '../VoiceMessagePlayer/VoiceMessagePlayer';
import MessageVideoPlayer from '../MessageVideoPlayer/MessageVideoPlayer';
import {useNavigation} from '@react-navigation/native';

interface Props {
  message: MessageModel;
}

const Message: React.FunctionComponent<Props> = ({message}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isMe, setIsMe] = useState<boolean | undefined | null>(null);
  const [soundUri, setSoundUri] = useState<any>(null);
  const [videoUri, setVideoUri] = useState<any>(null);

  const navigation = useNavigation();

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
        <Pressable
          onPress={() =>
            navigation.navigate(
              'ImageViewerScreen' as never,
              {
                image: message.image,
              } as never,
            )
          }>
          <S3Image
            imgKey={message.image}
            style={{
              width: '100%',
              aspectRatio: 4 / 5,
              borderRadius: 5,
            }}
            resizeMode={'cover'}
          />
        </Pressable>
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
      {videoUri ? (
        <MessageVideoPlayer
          isMe={isMe}
          sameOwner={message.prevMsgSameOwner}
          videoUri={videoUri}
        />
      ) : soundUri ? (
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
