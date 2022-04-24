import React, {ReactNode, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {DataStore, Auth} from 'aws-amplify';
import {User, ChatRoomUser} from '../../src/models';

interface Props {
  id: string;
}

const ChatRoomScreenHeader: React.FunctionComponent<Props> = ({id}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatRoom.id === id)
        .map(chatRoomUser => chatRoomUser.user);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null,
      );
    };
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.status}>Active now</Text>
      </View>
      <View style={styles.iconsContainer}>
        <Ionicons
          name={'ios-call'}
          size={20}
          color={'white'}
          style={styles.icon}
        />
        <FontAwesome
          name={'video-camera'}
          size={20}
          color={'white'}
          style={styles.icon}
        />
        <SimpleLineIcons
          name={'options-vertical'}
          size={20}
          color={'white'}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: '115%',
    height: '100%',
    marginTop: 5,
    marginLeft: 45,
  },
  name: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  status: {
    color: 'white',
    fontSize: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    paddingHorizontal: 5,
  },
});

export default ChatRoomScreenHeader;
