import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar} from 'react-native';
import Constants from 'expo-constants';
import Colors from '../../constants/Colors';

const CustomStatusBar: React.FunctionComponent = () => {
  return (
    <View style={styles.StatusBar}>
      <StatusBar translucent barStyle={'light-content'} />
    </View>
  );
};

const styles = StyleSheet.create({
  StatusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: Colors.green,
  },
});

export default CustomStatusBar;
