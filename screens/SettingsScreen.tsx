import React from 'react';
import {StyleSheet, View} from 'react-native';
import SettingsContainer from '../components/SettingsContainer/SettingsContainer';
import SettingsScreenHeader from '../components/SettingsScreenHeader/SettingsScreenHeader';
import Colors from '../constants/Colors';
import {Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {SettingsButtonProps} from '../components/SettingsButton/SettingsButton';

const SettingsScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();

  const AppSettingsButtons: Array<SettingsButtonProps> = [
    {
      text: 'Dark Mode',
      icon: <Ionicons name="moon" size={17} color={'white'} />,
      iconColor: '#4F5958',
      type: 'switch',
    },
    {
      text: 'Profile',
      icon: <MaterialCommunityIcons name="account" size={19} color={'white'} />,
      iconColor: Colors.green,
      type: 'navigate',
      onPress: () => {
        navigation.navigate('ProfileSettingsScreen' as never);
      },
    },
    {
      text: 'Chat Customize',
      icon: <Ionicons name="md-chatbubbles" size={17} color={'white'} />,
      iconColor: '#5871FD',
      type: 'navigate',
    },
    {
      text: 'Notification',
      icon: (
        <MaterialCommunityIcons name="bell-ring" size={17} color={'white'} />
      ),
      iconColor: '#F84680',
      type: 'navigate',
    },
    {
      text: 'Privacy',
      icon: <MaterialCommunityIcons name="shield" size={17} color={'white'} />,
      iconColor: '#BB58FD',
      type: 'navigate',
    },
  ];

  const AccountSettingsButtons: Array<SettingsButtonProps> = [
    {
      text: 'Logout',
      icon: <MaterialCommunityIcons name="lock" size={17} color={'white'} />,
      iconColor: '#F4BF3F',
      onPress: () => {
        Alert.alert('Sign out', 'Are u sure u want to sign out?', [
          {
            text: 'Yes',
            onPress: () => {
              Auth.signOut();
            },
          },
          {
            text: 'No',
          },
        ]);
      },
    },
    {
      text: 'Delete Account',
      icon: <MaterialCommunityIcons name="account" size={19} color={'white'} />,
      iconColor: '#F96B6D',
      type: 'navigate',
    },
  ];

  return (
    <View style={styles.root}>
      <SettingsScreenHeader />
      <View style={{margin: 15}}>
        <SettingsContainer options={AppSettingsButtons} />
        <SettingsContainer options={AccountSettingsButtons} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.background,
    width: '100%',
    height: '100%',
  },
});

export default SettingsScreen;
