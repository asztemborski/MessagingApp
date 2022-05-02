import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SettingsScreenHeader from '../components/SettingsScreenHeader/SettingsScreenHeader';
import Colors from '../constants/Colors';

const SettingsScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.root}>
      <SettingsScreenHeader />
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
