import React, { useContext } from "react";
import { View, Text } from "react-native-animatable";
import { TouchableHighlight, StyleSheet, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import CartContext from "../../contexts/cart";

import {
  Container,
  ProductImage,
  ProductInfo,
  ProductInfoHeader,
  ProductTitle,
  ProductPrice,
  ItemDescription,
  ProductButton,
  ProductButtonText
} from './styles';

interface Item {
  product: Product;
  description: string;
  id: number;
  name: string;
  price: number;
}

interface Product {
  name: string;
  price: number;
}

interface Props {
  modalData: (arg0: Item) => void;
  modalVisible: () => void;
  item: Item;
  navigation: NavigationProp<Record<string, object | undefined>>;
  visible: boolean;
}

const ProductFlatList: React.FC<Props> = (props) => {
  const cartContext = useContext(CartContext);

  function handleVisible() {
    props.modalVisible();
  }
  function handleModalData(data: Item) {
    props.modalData(data);
  }

  function handleNavigateToProdutoOverview(id: number) {
    props.navigation.navigate("ProductOverview");
  }

  return (
    <Container>
      <ProductImage
        source={require("../../assets/images/product.jpg")}
      />
      <ProductInfo>
        <ProductInfoHeader>
          <ProductTitle>{props.item.name}</ProductTitle>
          <ProductPrice>R$ {props.item.price}</ProductPrice>
        </ProductInfoHeader>
        <ItemDescription>{props.item.description}</ItemDescription>
        <ProductButton
          underlayColor="#FAFAFA"
          onPress={() => {
            handleNavigateToProdutoOverview(props.item.id);
          }}
        >
          <ProductButtonText>Ver Detalhes</ProductButtonText>
        </ProductButton>
        {cartContext.cart.opened ? (
          <ProductButton
            underlayColor="#FAFAFA"
            onPress={() => {
              handleModalData(props.item);
              handleVisible();
            }}
          >
            <ProductButtonText>Comprar</ProductButtonText>
          </ProductButton>
        ) : (
          <Text></Text>
        )}
      </ProductInfo>
    </Container>
  );
};

export default ProductFlatList;
