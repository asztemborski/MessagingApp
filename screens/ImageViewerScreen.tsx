import {
  Route,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {Storage} from 'aws-amplify';
import Colors from '../constants/Colors';
import {RootStackParamList} from '../navigation';

interface Props {
  image: string;
}

const ImageViewerScreen: React.FunctionComponent<Props> = () => {
  const [imageUri, setImageUri] = useState<any>(null);
  const [visible, setVisible] = useState(true);

  const route: RouteProp<RootStackParamList, 'ImageViewerScreen'> = useRoute();

  useEffect(() => {
    Storage.get(route.params?.image).then(setImageUri);
  }, []);

  const images = [{uri: imageUri}];

  const navigation = useNavigation();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.background,
      }}>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => {
          navigation.goBack();
          setVisible(false);
        }}
      />
    </View>
  );
};

export default ImageViewerScreen;
