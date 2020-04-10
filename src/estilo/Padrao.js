import {StyleSheet} from 'react-native';
import colors from '../config/colors';

export default StyleSheet.create({
  ex: {
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#222',
    fontSize: 24,
    fontWeight: 'bold',
  },
  smallLogo: {
    flex: 1,
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
});
