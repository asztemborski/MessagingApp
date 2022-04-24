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

    borderRadius: 8,
    left: 45,
    top: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContent: {
    width: 15,
    height: 15,
    backgroundColor: '#2cb9b0',
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 3,
  },
  rightContainer: {
    paddingLeft: 5,
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newMessageIcon: {
    width: 7,
    height: 7,
    backgroundColor: '#2cb9b0',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: 'gray',
  },
  trashIconContainer: {
    position: 'absolute',
    right: 25,
    top: 20,
  },
});

export default styles;
