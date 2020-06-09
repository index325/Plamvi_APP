import React, { Component, useEffect, useState, useContext } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import CartContext from "../contexts/cart";
import CartListing from "../components/CartListing";
import { NavigationProp } from "@react-navigation/native";

interface ModalData {
  name: string;
  price: number;
  id: number;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
  description: string;
  name: string;
}

interface Props {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const CartScreen: React.FC<Props> = (props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [modalData, setModalData] = useState<ModalData>();

  const context = useContext(CartContext);

  function _modalVisible() {
    if (modalVisible) setModalVisible(!modalVisible);
  }

  function _setModalData(data: any) {
    setModalData(data);
  }

  useEffect(() => {
    async function getCartItems() {
      await setCartItems(context.cart);
    }
    getCartItems();
  }, [context.cart]);

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        data={cartItems}
        keyExtractor={(item: CartItem) => item.id.toString()}
        renderItem={({ item }) => (
          <CartListing
            item={item}
            modalVisible={_modalVisible}
            modalData={_setModalData}
            visible={modalVisible}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
  },
  list: {
    padding: 20,
  },
});

export default CartScreen;
