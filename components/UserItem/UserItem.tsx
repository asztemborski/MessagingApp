import React from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {User} from '../../types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  user: User;
}

const UserItem: React.FunctionComponent<Props> = ({user}) => {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: '#FF6E6E'}}>
      <Pressable style={styles.container}>
        <Image
          source={{
            uri: user.imageUri,
          }}
          style={styles.image}
        />
        <View style={styles.statusContainer}>
          <View style={styles.statusContent} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UserItem;
