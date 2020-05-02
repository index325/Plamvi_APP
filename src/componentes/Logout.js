import React, {useContext} from 'react';
import {View, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import AuthContext from '../contexts/auth';

const _clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // Error saving data
  }
};

const goToLogin = (navigation, signOut) => {
  // navigation.navigate('loginScreen');
  // _clearStorage();
  signOut();
};

export default function Logout() {
  const {signed, user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={{marginRight: 10}}>
      <TouchableHighlight onPress={() => goToLogin(navigation, signOut)}>
        <Icon name="exit-run" type="material-community" color="#517fa4" />
      </TouchableHighlight>
    </View>
  );
}
