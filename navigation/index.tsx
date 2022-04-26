import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
};

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.green},
      }}>
      <Stack.Screen
        name={'Root'}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'ChatRoomScreen'}
        component={ChatRoomScreen}
        options={({route}) => ({
          headerTitle: () => <ChatRoomScreenHeader id={route.params?.id} />,
          headerLeft: () => <BackButton style={{paddingHorizontal: 10}} />,
          headerTitleContainerStyle: {marginLeft: -10},
        })}
      />
      <Stack.Screen
        name="CreateChatScreen"
        component={CreateChatScreen}
        options={{
          headerShown: false,
        }}
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
