import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  text: {
    marginLeft: 2,
    color: 'white',
    fontWeight: '600',
  },
  rightContent: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
