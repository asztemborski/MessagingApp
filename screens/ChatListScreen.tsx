import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem/ChatRoomItem';
import chatRoomsData from '../assets/dummy-data/ChatRooms';

const ChatListScreen: React.FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatRoomsData}
        renderItem={({item}) => <ChatRoomItem chatRoom={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#19191b',
  },
});

export default ChatListScreen;
