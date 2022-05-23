import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
  onDonePressed: () => void;
  onUndoPressed: () => void;
}

const ProfileSettingsScreenHeader: React.FunctionComponent<Props> = ({
  onDonePressed,
  onUndoPressed,
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Profile Settings</Text>
      <View style={{flexDirection: 'row'}}>
        <Text onPress={onUndoPressed} style={styles.text}>
          Undo
        </Text>
        <Text onPress={onDonePressed} style={styles.text}>
          Done
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.green,
    width: '100%',
    height: 65,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
  },
  text: {
    color: 'white',
    paddingHorizontal: 3,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProfileSettingsScreenHeader;
