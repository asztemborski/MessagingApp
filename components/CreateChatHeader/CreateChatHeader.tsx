import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import BackButton from '../BackButton/BackButton';
import Feather from 'react-native-vector-icons/Feather';
import {TextInput} from 'react-native-gesture-handler';

const CreateChatHeader: React.FunctionComponent = () => {
  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <BackButton />
        <Text style={styles.title}>Create Chat</Text>
        <Text style={styles.confirm}>Done</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.searchBar}>
          <Feather
            name={'search'}
            size={18}
            color={'white'}
            style={styles.icon}
          />
          <TextInput style={styles.input} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.green,
    width: '100%',
    height: 50,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  confirm: {
    color: 'white',
    fontSize: 15,
  },
  bottomContainer: {
    backgroundColor: Colors.green,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    width: '95%',
    backgroundColor: '#4BC3BC',
    height: 30,
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    fontSize: 14,
    alignItems: 'center',
    flex: 1,
    height: 30,
    padding: 0,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default CreateChatHeader;
