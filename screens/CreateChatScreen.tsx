import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import {DataStore} from '@aws-amplify/datastore';
import {User} from '../src/models';
import UserItem from '../components/UserItem/UserItem';

import CreateChatHeader from '../components/CreateChatHeader/CreateChatHeader';

const CreateChatScreen: React.FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <CreateChatHeader />

      <FlatList
        data={users}
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
