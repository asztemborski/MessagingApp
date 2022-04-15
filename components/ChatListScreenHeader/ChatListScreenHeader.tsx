import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const ChatListScreenHeader: React.FunctionComponent = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>All Chat</Text>
      <View style={styles.iconsContainer}>
        <Ionicons
          name={'person-add-sharp'}
          size={24}
          color={'white'}
          style={styles.icon}
        />
        <Feather
          name={'search'}
          size={24}
          color={'white'}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.green,
    width: '100%',
    height: 65,
    alignItems: 'center',
    padding: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '500',
    letterSpacing: 1,
  },
  icon: {
    paddingHorizontal: 5,
  },
});

export default ChatListScreenHeader;
