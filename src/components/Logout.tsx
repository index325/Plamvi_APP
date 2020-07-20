import React, { useContext } from "react";
import { View, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import colors from "../config/colors";

import AuthContext from "../contexts/auth";

const _clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // Error saving data
  }
};

const goToLogin = (
  // navigation: NavigationProp<Record<string, object | undefined>>,
  signOut: any
) => {
  // navigation.navigate('loginScreen');
  // _clearStorage();
  signOut();
};

const Logout: React.FC = () => {
  const { signed, user, signOut } = useContext(AuthContext);
  // const navigation = useNavigation();
  return (
    <View style={{ marginRight: 10 }}>
      <TouchableHighlight onPress={() => goToLogin(signOut)}>
        <Icon name="exit-run" type="material-community" color={colors.BLACK} />
      </TouchableHighlight>
    </View>
  );
};

export default Logout;
