import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Option} from '../components/SettingsContainer/SettingsContainer';
import Colors from '../constants/Colors';

export const AppSettingsButtons: Array<Option> = [
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
  },
  {
    text: 'Chat Customize',
    icon: <Ionicons name="md-chatbubbles" size={17} color={'white'} />,
    iconColor: '#5871FD',
    type: 'navigate',
  },
  {
    text: 'Notification',
    icon: <MaterialCommunityIcons name="bell-ring" size={17} color={'white'} />,
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

export const AccountSettingsButtons: Array<Option> = [
  {
    text: 'Logout',
    icon: <MaterialCommunityIcons name="lock" size={17} color={'white'} />,
    iconColor: '#F4BF3F',
  },
  {
    text: 'Delete Account',
    icon: <MaterialCommunityIcons name="account" size={19} color={'white'} />,
    iconColor: '#F96B6D',
    type: 'navigate',
  },
];
