import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProfileSettings from '../components/ProfileSettings/ProfileSettings';
import ProfileSettingsScreenHeader from '../components/ProfileSettingsHeader/ProfileSettingsHeader';
import Colors from '../constants/Colors';

const ProfileSettingsScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.root}>
      <ProfileSettingsScreenHeader />
      <View style={{margin: 15}}>
        <ProfileSettings />
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

export default ProfileSettingsScreen;
