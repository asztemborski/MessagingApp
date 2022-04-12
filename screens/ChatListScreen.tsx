import React from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem/ChatRoomItem';
import chatRoomsData from '../assets/dummy-data/ChatRooms';
import ChatListScreenHeader from '../components/ChatListScreenHeader/ChatListScreenHeader';

const ChatListScreen: React.FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.page}>
      <ChatListScreenHeader />
      <FlatList
        data={chatRoomsData}
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
