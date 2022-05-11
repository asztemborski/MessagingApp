import {Auth, DataStore} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingsScreenHeader from '../components/SettingsScreenHeader/SettingsScreenHeader';
import Colors from '../constants/Colors';
import {User} from '../src/models';

const SettingsScreen: React.FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const user = await DataStore.query(User, authUser.attributes.sub);
      setUserInfo(user);
    };
    fetchUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <SettingsScreenHeader />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            padding: 35,
            backgroundColor: Colors.darkGray,
            width: '95%',
            height: '90%',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{
                uri: userInfo?.imageUri,
              }}
              style={{width: 100, height: 100, borderRadius: 75}}
            />
          </View>
          <Text style={{color: 'white'}}>Essa</Text>
        </View>
      </View>
    </SafeAreaView>
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
