import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    width: '95%',
    backgroundColor: Colors.darkGray,
    padding: 15,
    margin: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cameraIcon: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: Colors.green,
    right: 115,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 80,
  },
});

export default styles;
