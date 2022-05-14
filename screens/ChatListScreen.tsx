import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem/ChatRoomItem';
import ChatListScreenHeader from '../components/ChatListScreenHeader/ChatListScreenHeader';
import {Auth} from 'aws-amplify';
import {DataStore} from 'aws-amplify';
import {ChatRoom, ChatRoomUser} from '../src/models';

const ChatListScreen: React.FunctionComponent = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [chatRoomsUpdated, setChatRoomsUpdated] = useState(false);

  useEffect(() => {
    const subscription = DataStore.observe(ChatRoom).subscribe(() => {
      setChatRoomsUpdated(prevState => !prevState);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const fetchedChatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          chatRoomUser => chatRoomUser.user.id === userData.attributes.sub,
        )
        .map(ChatRoomUser => ChatRoomUser.chatRoom);

      setChatRooms(fetchedChatRooms);
    };
    fetchChatRooms();
  }, [chatRoomsUpdated]);

  return (
    <SafeAreaView style={styles.page}>
      <ChatListScreenHeader />
      <FlatList
        data={chatRooms}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#19191b',
    height: '100%',
    width: '100%',
  },
});

export default ChatListScreen;
