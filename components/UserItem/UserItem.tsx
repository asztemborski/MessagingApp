import React from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {User, ChatRoom, ChatRoomUser} from '../../src/models';
import styles from './styles';
import {DataStore} from '@aws-amplify/datastore';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';

interface Props {
  user: User;
}

const UserItem: React.FunctionComponent<Props> = ({user}) => {
  const navigation = useNavigation();

  const OnPress = async () => {
    //create ChatRoom
    const newChatRoom = await DataStore.save(new ChatRoom({newMessages: 0}));

    //connect authenticated user with the ChatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    const dataBaseUser = await DataStore.query(User, authUser.attributes.sub);
    await DataStore.save(
      new ChatRoomUser({
        user: dataBaseUser,
        chatRoom: newChatRoom,
      }),
    );

    //connect clicked user with the ChatRoom
    await DataStore.save(
      new ChatRoomUser({
        user,
        chatRoom: newChatRoom,
      }),
    );

    //navigate
    navigation.navigate(
      'ChatRoomScreen' as never,
      {id: newChatRoom.id} as never,
    );
  };

  return (
    <Pressable style={styles.container} onPress={OnPress}>
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
  );
};

export default UserItem;
