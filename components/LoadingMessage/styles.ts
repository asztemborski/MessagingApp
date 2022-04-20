import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginTop: 12,
    backgroundColor: Colors.darkGray,
  },
  textContainer: {
    backgroundColor: Colors.darkGray,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '40%',
    height: 60,
  },
});

export default styles;
