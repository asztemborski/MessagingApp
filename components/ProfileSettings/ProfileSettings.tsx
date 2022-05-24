import React, {useEffect, useState} from 'react';
import {Auth, DataStore, Storage} from 'aws-amplify';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  View,
} from 'react-native';
import {User} from '../../src/models';
import styles from './styles';
import ProfileSettingsInput from '../ProfileSettingsInput/ProfileSettingsInput';
import ProfileSettingsScreenHeader from '../ProfileSettingsHeader/ProfileSettingsHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import ImageSelectorBottomSheet from '../ImageSelectorBottomSheet/ImageSelectorBottomSheet';
import uuid from 'react-native-uuid';

const ProfileSettings: React.FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const [userName, setUserName] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<ImageOrVideo | null>(
    null,
  );

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const user = await DataStore.query(User, authUser.attributes.sub);
      setUserInfo(user);
      setUserName(user.name);
    };
    fetchUserInfo();
  }, []);

  const onDonePressed = async () => {
    if (!userInfo) return;
    await DataStore.save(
      User.copyOf(userInfo, user => {
        user.name = userName;
      }),
    );

    navigation.goBack();
  };

  const onUndoPressed = () => {
    if (userInfo) setUserName(userInfo.name);
    setNewProfileImage(null);
  };

  const onImagePressed = () => {
    setShowBottomSheet(true);
  };

  const onImageFromGalleryPressed = async () => {
    const image = await ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: false,
      mediaType: 'photo',
    });

    setNewProfileImage(image);
    setShowBottomSheet(false);
  };

  const getBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log(blob);
    return blob;
  };

  if (!userInfo) return <ActivityIndicator />;

  return (
    <View style={{height: '100%'}}>
      <View>
        <ProfileSettingsScreenHeader
          onDonePressed={onDonePressed}
          onUndoPressed={onUndoPressed}
        />
        <KeyboardAvoidingView style={styles.root}>
          <Pressable onPress={onImagePressed} style={styles.imageContainer}>
            <Image
              source={{
                uri: newProfileImage ? newProfileImage.path : userInfo.imageUri,
              }}
              style={styles.image}
            />
            <View style={styles.cameraIcon}>
              <Entypo name="camera" size={15} color={'white'} />
            </View>
          </Pressable>

          <View>
            <ProfileSettingsInput
              text="Name"
              defaultValue={userName}
              value={userName}
              onInputChange={value => setUserName(value)}
            />
            <ProfileSettingsInput
              text="Location"
              defaultValue={'New York, NYC'}
            />
            <ProfileSettingsInput
              text="Phone"
              defaultValue={'+880 7935 021 359'}
            />
            <ProfileSettingsInput text="Twitter" defaultValue={'@igor'} />
          </View>
        </KeyboardAvoidingView>
      </View>
      {showBottomSheet && (
        <ImageSelectorBottomSheet
          onClose={() => {
            if (showBottomSheet === true) setShowBottomSheet(false);
          }}
          onGalleryPressed={onImageFromGalleryPressed}
        />
      )}
    </View>
  );
};
export default ProfileSettings;
