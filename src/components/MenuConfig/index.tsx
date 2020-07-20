import React from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../Button";

import { Container } from './styles'

const MenuConfig: React.FC = () => {
  const navigation = useNavigation();

  const handleChangeInfo = () => {
    navigation.navigate("updateUserScreen");
  };

  return (
    <Container>
      <Button label="Alterar Informações" onPress={handleChangeInfo} />
    </Container>
  );
};

export default MenuConfig;