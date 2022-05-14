import React from 'react';
import {StyleSheet, View} from 'react-native';
import SettingsContainer from '../components/SettingsContainer/SettingsContainer';
import SettingsScreenHeader from '../components/SettingsScreenHeader/SettingsScreenHeader';
import Colors from '../constants/Colors';
import {
  AppSettingsButtons,
  AccountSettingsButtons,
} from '../assets/SettingOptions';

const SettingsScreen: React.FunctionComponent = () => {
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
