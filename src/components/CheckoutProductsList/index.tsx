import React from "react";
import { Text } from "react-native-animatable";

import { Container } from './styles';

const CheckoutProductsList: React.FC<any> = (props) => {
  const { data } = props;
  return (
    <Container>
      <Text>{data.quantity}x</Text>
      <Text>{data.product.name}</Text>
      <Text>R${data.product.price}</Text>
    </Container>
  );
};

export default CheckoutProductsList;
