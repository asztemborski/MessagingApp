import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Colors from '../../constants/Colors';

interface Props {
  onClose?: () => void;
  onGalleryPressed?: () => void;
  onCameraPressed?: () => void;
}

const ImageSelectorBottomSheet: React.FunctionComponent<Props> = ({
  onClose,
  onGalleryPressed,
  onCameraPressed,
}) => {
  const snapPoints = useMemo(() => ['25%'], []);

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      backgroundStyle={{backgroundColor: Colors.darkGray}}
      handleIndicatorStyle={{backgroundColor: Colors.green}}
      style={{backgroundColor: Colors.background}}>
      <View style={styles.contentContainer}>
        <Pressable onPress={onGalleryPressed} style={styles.button}>
          <Text style={styles.text}>Choose from gallery</Text>
        </Pressable>
        <Pressable onPress={onCameraPressed} style={styles.button}>
          <Text style={styles.text}>Open camera</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImageSelectorBottomSheet;
