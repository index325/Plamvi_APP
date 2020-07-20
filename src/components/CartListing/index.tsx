import React from "react";
import { NavigationProp } from "@react-navigation/native";

import {
  Container,
  ProductImage,
  ProductInfo,
  ProductInfoHeader,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  ProductButton,
  ProductButtonText,
 } from './styles'

interface CartItem {
  product: Product;
  description: string;
  id: number;
  name: string;
}

interface Product {
  name: string;
  price: number;
}

interface Props {
  modalData: (arg0: CartItem) => void;
  modalVisible: () => void;
  item: CartItem;
  navigation: NavigationProp<Record<string, object | undefined>>;
  visible: boolean | undefined;
}

const CartListing: React.FC<Props> = (props) => {
  function handleVisible() {
    props.modalVisible();
  }
  function handleModalData(data: CartItem) {
    props.modalData(data);
  }
  function handleNavigateToProdutoOverview(id: number) {
    props.navigation.navigate("ProductOverview");
  }
  return (
    <Container>
      <ProductImage source={require("../assets/images/product.jpg")}/>
      <ProductInfo>
        <ProductInfoHeader>
          <ProductTitle>{props.item.product.name}</ProductTitle>
          <ProductPrice>R$ {props.item.product.price}</ProductPrice>
        </ProductInfoHeader>
        <ProductDescription>{props.item.description}</ProductDescription>
        <ProductButton
          underlayColor="#FAFAFA"
          onPress={() => {
            handleNavigateToProdutoOverview(props.item.id);
          }}
        >
          <ProductButtonText>Ver Detalhes</ProductButtonText>
        </ProductButton>
        <ProductButton
          underlayColor="#FAFAFA"
          onPress={() => {
            handleModalData(props.item);
            handleVisible();
          }}
        >
          <ProductButtonText>Comprar</ProductButtonText>
        </ProductButton>
      </ProductInfo>
    </Container>
  );
};

// TODO - Ver se os estilos são úteis
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fafafa",
//   },
//   list: {
//     padding: 20,
//   },
//   productContainer: {
//     backgroundColor: "#FFF",
//     borderWidth: 1,
//     borderColor: "#DDD",
//     borderRadius: 5,
//     padding: 20,
//     marginBottom: 20,
//   },
//   productButtonText: {
//     fontSize: 16,
//     color: "#DA552F",
//     fontWeight: "bold",
//   },
// });

export default CartListing;
