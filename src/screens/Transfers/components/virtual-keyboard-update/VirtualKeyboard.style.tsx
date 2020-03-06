import { StyleSheet, Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
    width: Dimensions.get('window').width,
  },
  number: {
    fontSize: 25,
    textAlign: 'center',
  },
  backspace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    height: 60,
  },
});