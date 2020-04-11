import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

// function llogout() {
//   try {

//     console.log(navigation);
//     // await AsyncStorage.clear();
//     navigation.navigate('loginScreen');
//   } catch (error) {
//     // Error saving data
//   }
// }

const _clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // Error saving data
  }
};

const goToLogin = navigation => {
  navigation.navigate('loginScreen');
  _clearStorage();
};

function Logout() {
  const navigation = useNavigation();
  return (
    <View style={{marginRight: 10}}>
      <TouchableHighlight onPress={() => goToLogin(navigation)}>
        <Icon name="exit-run" type="material-community" color="#517fa4" />
      </TouchableHighlight>
    </View>
  );
}

export default Logout;
