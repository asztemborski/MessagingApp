import React from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import UserItem from '../components/UserItem/UserItem';
import chatRoomsData from '../assets/dummy-data/ChatRooms';
import CreateChatHeader from '../components/CreateChatHeader/CreateChatHeader';

const CreateChatScreen: React.FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.page}>
      <CreateChatHeader />
      <FlatList
        data={chatRoomsData}
        renderItem={({item}) => <UserItem chatRoom={item} />}
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

export default CreateChatScreen;
