import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: width + 4,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#19191b',
    zIndex: 10,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  statusContainer: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    left: 45,
    top: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContent: {
    width: 13,
    height: 13,
    backgroundColor: '#2cb9b0',
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 1.5,
  },
  rightContainer: {
    paddingLeft: 5,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default styles;
