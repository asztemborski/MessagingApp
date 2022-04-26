import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    margin: 10,
    marginRight: 0,
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    margin: 10,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
