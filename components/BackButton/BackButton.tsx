import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  style?: {};
}

const BackButton: React.FunctionComponent<Props> = ({style}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.goBack()}>
      <Feather name={'arrow-left'} size={24} color={'white'} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    alignItems: 'center',
    marginTop: 5,
  },
});

export default BackButton;
