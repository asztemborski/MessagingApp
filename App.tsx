import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import ChatListScreen from './screens/ChatListScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import Navigation from './navigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App: React.FunctionComponent = () => {
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'red'}}>
      <Navigation />
    </View>
  );
};

export default App;
