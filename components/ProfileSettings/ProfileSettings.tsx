import React, {useEffect, useState} from 'react';
import {Auth, DataStore} from 'aws-amplify';

import {ActivityIndicator, Image, Text, TextInput, View} from 'react-native';
import { User } from '../../src/models';
import styles from './styles';

const ProfileSettings: React.FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const user = await DataStore.query(User, authUser.attributes.sub);
      setUserInfo(user);
    };
    fetchUserInfo();
  }, []);

  if (!userInfo) return <ActivityIndicator />;

  return (
    <View style={styles.root}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <Image source={{uri: userInfo.imageUri}} style={styles.image} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: 'gray'}}>Name</Text>
        <TextInput style={{color: 'white'}} defaultValue={userInfo.name} />
      </View>
    </View>
  );
};
export default ProfileSettings;
