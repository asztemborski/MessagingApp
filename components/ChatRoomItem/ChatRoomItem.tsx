import React from 'react';
import {Text, View, Image, Pressable} from 'react-native';
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
import {User} from '../../types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  chatRoom: {
    id: string;
    users: Array<User>;
    lastMessage: {
      content: string;
      createdAt: string;
    };
    newMessages: number;
  };
}

type ContextType = {
  translateX: number;
};

const ChatRoomItem: React.FunctionComponent<Props> = ({chatRoom}) => {
  const navigation = useNavigation();
  const user = chatRoom.users[1];

  const translateX = useSharedValue(0);

  const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

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
                {chatRoom.newMessages > 0 && (
                  <View style={styles.newMessageIcon} />
                )}
              </View>

              <Text style={{color: 'white'}}>
                {chatRoom.lastMessage.createdAt}
              </Text>
            </View>
            <Text
              style={[
                styles.text,
                chatRoom.newMessages > 0 && {color: 'white'},
              ]}
              numberOfLines={1}>
              {chatRoom.lastMessage.content}
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
