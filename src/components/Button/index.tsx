import React from "react";

import { Container, ButtonText } from './styles';

const Button: React.FC<any> = (props) => {
  const { label, onPress, disabled } = props;

  return (
    <Container onPress={onPress} disabled={disabled}>
      <ButtonText disabled={disabled}>{label}</ButtonText>
    </Container>
  );
};

export default Button;
