import React, { useContext } from "react";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import colors from "../../config/colors";

import AuthContext from "../../contexts/auth";

import { Container, Button } from './styles';

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
  const { signOut } = useContext(AuthContext);
  return (
    <Container>
      <Button onPress={() => goToLogin(signOut)}>
        <Icon name="exit-run" type="material-community" color={colors.BLACK} />
      </Button>
    </Container>
  );
};

export default Logout;
