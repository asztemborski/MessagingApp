import React, {useState, useEffect} from 'react';
import {DataStore} from 'aws-amplify';
import {ChatRoomUser, User} from '../../src/models';
import {Text, View, Image, Pressable, ActivityIndicator} from 'react-native';
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Reanimated from 'react-native-reanimated';
import {ChatRoom} from '../../src/models';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

interface Props {
  chatRoom: ChatRoom;
}

type ContextType = {
  translateX: number;
};

const ChatRoomItem: React.FunctionComponent<Props> = ({chatRoom}) => {
  const [user, setUser] = useState<User | null>(null); //displayed user
  const translateX = useSharedValue(0);

  const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatRoom.id === chatRoom.id)
        .map(chatRoomUser => chatRoomUser.user);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null,
      );
    };
    fetchUsers();
  }, []);

  const newMessages = () => {
    if (chatRoom.newMessages != null) {
      return chatRoom.newMessages > 0;
    } else {
      return false;
    }
  };

  const onPress = () => {
    navigation.navigate('ChatRoomScreen' as never, {id: chatRoom.id} as never);
  };

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;

      if (translateX.value > 0) translateX.value = 0;
      if (translateX.value < -70) translateX.value = -70;
    },
    onEnd: () => {
      translateX.value = withTiming(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{backgroundColor: '#FF6E6E'}}>
      {/*@ts-expect-error*/}
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <ReanimatedPressable
          style={[styles.container, rStyle]}
          onPress={onPress}>
          <Image
            source={{
              uri: user.imageUri,
            }}
            style={styles.image}
          />
          <View style={styles.statusContainer}>
            <View style={styles.statusContent} />
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.row}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.name}>{user.name}</Text>
                {newMessages() && <View style={styles.newMessageIcon} />}
              </View>

              <Text style={{color: newMessages() ? 'white' : 'grey'}}>
                {chatRoom.LastMessage?.createdAt}
              </Text>
            </View>
            <Text
              style={[styles.text, newMessages() && {color: 'white'}]}
              numberOfLines={1}>
              {chatRoom.LastMessage?.content}
            </Text>
          </View>
        </ReanimatedPressable>
      </PanGestureHandler>
      <View style={styles.trashIconContainer}>
        <FontAwesome5 name={'trash'} size={22} color={'white'} />
      </View>
    </View>
  );
};

export default gestureHandlerRootHOC(ChatRoomItem);
