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
  },
  textContainer: {
    backgroundColor: Colors.darkGray,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '60%',
    marginBottom: 2,
  },
  text: {
    color: 'white',
  },
});

export default styles;
