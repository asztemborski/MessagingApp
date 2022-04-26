import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  data: {
    bgColor: string;
    name: string;
    icon: ReactNode;
    onPress?: () => void;
  };
}

const AttachmentButton: React.FunctionComponent<Props> = ({data}) => {
  return (
    <Pressable onPress={data.onPress} style={styles.root}>
      <View style={[styles.icon, {backgroundColor: data.bgColor}]}>
        {data.icon}
      </View>
      <Text style={styles.name}>{data.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 4,
    color: 'white',
    textAlign: 'center',
  },
});

export default AttachmentButton;
