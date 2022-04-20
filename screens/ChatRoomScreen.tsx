import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import Message from '../components/Message/Message';
import {FlatList} from 'react-native-gesture-handler';
import MessageInput from '../components/MessageInput/MessageInput';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DataStore, SortDirection} from 'aws-amplify';
import {Message as MessageModel, ChatRoom} from '../src/models';

const ChatRoomScreen: React.FunctionComponent = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe(msg => {
      if (msg.model === MessageModel && msg.opType === 'INSERT') {
        setMessages(previousMessages => [msg.element, ...previousMessages]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.log('No chatroom id provided');
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.log("Couldn't find chatroom with this id ");
    } else {
      setChatRoom(chatRoom);
    }
  };

  useEffect(() => {
    setMessages(isPrevMsgSameOwner(messages));
  }, [messages]);

  const fetchMessages = async () => {
    if (!chatRoom) return;

    const fetchedMessages = await DataStore.query(
      MessageModel,
      messages => messages.chatroomID('eq', chatRoom?.id),
      {
        sort: message => message.createdAt(SortDirection.DESCENDING),
      },
    );

    setMessages(isPrevMsgSameOwner(fetchedMessages));
  };

  const isPrevMsgSameOwner = (messages: Array<MessageModel>) => {
    for (let i = 0; i < messages.length - 1; i++) {
      if (messages[i].userID === messages[i + 1].userID) {
        messages[i] = {...messages[i], prevMsgSameOwner: true};
      } else {
        messages[i] = {...messages[i], prevMsgSameOwner: false};
      }
    }

    return messages;
  };

  navigation.setOptions({title: 'Elon Musk'});

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaProvider style={styles.page}>
      <FlatList
        data={messages}
        renderItem={({item}) => <Message message={item} />}
        inverted
      />
      <MessageInput chatRoom={chatRoom} />
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
