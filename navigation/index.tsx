import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BackButton from '../components/BackButton/BackButton';
import ChatRoomScreenHeader from '../components/ChatRoomScreenHeader/ChatRoomScreenHeader';
import Colors from '../constants/Colors';
import ChatListScreen from '../screens/ChatListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.green},
      }}>
      <Stack.Screen
        name={'ChatListScreen'}
        component={ChatListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ChatRoomScreen'}
        component={ChatRoomScreen}
        options={{
          headerTitle: ChatRoomScreenHeader,
          headerLeft: () => <BackButton />,
          headerTitleContainerStyle: {marginLeft: -10},
        }}
      />
    </Stack.Navigator>
  );
}
