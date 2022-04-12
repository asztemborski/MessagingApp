import React, {ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface Props {
  children: ReactNode;
}

const ChatRoomScreenHeader: React.FunctionComponent<Props> = ({children}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{children}</Text>
        <Text style={styles.status}>Active now</Text>
      </View>
      <View style={styles.iconsContainer}>
        <Ionicons
          name={'ios-call'}
          size={20}
          color={'white'}
          style={styles.icon}
        />
        <FontAwesome
          name={'video-camera'}
          size={20}
          color={'white'}
          style={styles.icon}
        />
        <SimpleLineIcons
          name={'options-vertical'}
          size={20}
          color={'white'}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  name: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  status: {
    color: 'white',
    fontSize: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    paddingHorizontal: 5,
  },
});

export default ChatRoomScreenHeader;
