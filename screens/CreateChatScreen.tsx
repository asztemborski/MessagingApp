import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import UserItem from '../components/UserItem/UserItem';
import Users from '../assets/dummy-data/Users';
import CreateChatHeader from '../components/CreateChatHeader/CreateChatHeader';

const CreateChatScreen: React.FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.page}>
      <CreateChatHeader />

      <FlatList
        data={Users}
        renderItem={({item}) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            All Users
          </Text>
        }
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
