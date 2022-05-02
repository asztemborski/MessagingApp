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
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
  },
  imageMessage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  textInput: {
    color: 'white',
    flex: 1,
    alignSelf: 'flex-end',
  },
  emojiIconBackground: {
    position: 'absolute',
    width: 22,
    borderRadius: 10,
    height: 22,
    backgroundColor: Colors.green,
    right: 2.5,
    alignSelf: 'flex-end',
    bottom: 13.25,
  },
  buttonContainer: {
    bottom: 5,
    margin: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

export default styles;
