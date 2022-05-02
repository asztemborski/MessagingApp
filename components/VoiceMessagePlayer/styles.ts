import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    height: 40,
    width: '100%',
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    borderColor: Colors.background,
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
  },
  audioProgressBG: {
    height: 1,
    flex: 1,
    margin: 10,
    backgroundColor: Colors.background,
    borderRadius: 5,
  },
  audioProgressFG: {
    width: 7,
    height: 7,
    borderRadius: 15,
    backgroundColor: Colors.green,
    position: 'absolute',
    top: -3,
  },
});

export default styles;
