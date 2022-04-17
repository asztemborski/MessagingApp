import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem/ChatRoomItem';
import chatRoomsData from '../assets/dummy-data/ChatRooms';
import ChatListScreenHeader from '../components/ChatListScreenHeader/ChatListScreenHeader';
import {Auth} from 'aws-amplify';

const ChatListScreen: React.FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.page}>
      <ChatListScreenHeader />
      <FlatList
        data={chatRoomsData}
        renderItem={({item}) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
      <Text
        onPress={() => {
          Auth.signOut();
        }}>
        Logout
      </Text>
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
