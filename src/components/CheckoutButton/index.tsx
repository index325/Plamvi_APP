import React from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Container, Button, ButtonText } from './styles';

const CheckoutButton: React.FC<any> = (props) => {
  const { label, onPress } = props;

  return (
    <Container>
      <Button onPress={onPress}>
        {props.children}
        <ButtonText>{label}</ButtonText>
      </Button>
    </Container>
  );
};
// TODO - Analisar utilidade dos estilos abaixo
// const styles = StyleSheet.create({
//   icon: {
//     color: colors.ICONS_COLOR,
//     marginRight: 10
//   },
// });

export default CheckoutButton;
