import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BackButton from '../components/BackButton/BackButton';
import ChatRoomScreenHeader from '../components/ChatRoomScreenHeader/ChatRoomScreenHeader';
import Colors from '../constants/Colors';
import ChatListScreen from '../screens/ChatListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import CreateChatScreen from '../screens/CreateChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from '../screens/ProfileScreen';
import ImageViewerScreen from '../screens/ImageViewerScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Root: undefined;
  ChatListScreen: undefined;
  ChatRoomScreen: {id: string};
  CreateChatScreen: undefined;
  ImageViewerScreen: {image: string};
  ProfileSettingsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.green},
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name={'Root'}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'ChatRoomScreen'}
        component={ChatRoomScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateChatScreen"
        component={CreateChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ImageViewerScreen'}
        component={ImageViewerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'ProfileSettingsScreen'}
        component={ProfileSettingsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export type RootTabParamList = {
  ProfileScreen: undefined;
  Chats: undefined;
  Settings: undefined;
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.darkGray,
          height: '10%',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: '#BEBEC0',
      }}>
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name={'home'} size={30} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={'Chats'}
        component={ChatListScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="chat-bubble" size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name={'settings'} size={25} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
