import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import AttachmentButton from './AttachmentButton';

type Button = {
  icon: ReactNode;
  name: string;
  onPress?: () => void;
  bgColor: string;
};

interface Props {
  buttons: Array<Button>;
}

const AttachmentsMenu: React.FunctionComponent<Props> = ({buttons}) => {
  return (
    <View style={styles.root}>
      <FlatList
        data={buttons}
        renderItem={({item}) => <AttachmentButton data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.darkGray,
    marginTop: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});

export default AttachmentsMenu;
