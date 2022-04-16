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

const UserItem: React.FunctionComponent<Props> = ({chatRoom}) => {
  const navigation = useNavigation();
  const user = chatRoom.users[1];
  return (
    <View style={{backgroundColor: '#FF6E6E'}}>
      <Pressable style={styles.container}>
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
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UserItem;
