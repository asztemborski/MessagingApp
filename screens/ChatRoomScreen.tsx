import React from 'react';
import {StyleSheet} from 'react-native';
import Message from '../components/Message/Message';
import chatRoomData from '../assets/dummy-data/Chats';
import {FlatList} from 'react-native-gesture-handler';
import MessageInput from '../components/MessageInput/MessageInput';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';

const ChatRoomScreen: React.FunctionComponent = () => {
  const route = useRoute();
  const navigation = useNavigation();

  navigation.setOptions({title: 'Elon Musk'});

  return (
    <SafeAreaProvider style={styles.page}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({item}) => <Message message={item} />}
        inverted
      />
      <MessageInput />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#19191b',
  },
});

export default ChatRoomScreen;
