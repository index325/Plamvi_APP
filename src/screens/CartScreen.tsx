import React, { Component, useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import CartContext from "../contexts/cart";
import CartListing from "../components/CartListing";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CheckoutButton from "../components/CheckoutButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import constants from "../config/constants";

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

interface Cart {
  cart_itens: Array<CartItem>;
}

interface Props {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const CartScreen: React.FC<Props> = (props) => {
  const [cart, setCart] = useState<any>({
    cart_itens: [],
    createdAt: "",
    id: 0,
    opened: true,
    updatedAt: "",
    user_id: 0,
  });
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [modalData, setModalData] = useState<ModalData>();

  const context = useContext(CartContext);
  const navigation = useNavigation();

  function _modalVisible() {
    if (modalVisible) setModalVisible(!modalVisible);
  }

  function _setModalData(data: any) {
    setModalData(data);
  }

  useEffect(() => {
    setCart(context.cart);
  }, [context.cart]);

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  return (
    <View>
      <CheckoutButton
        label="Prosseguir para o checkout"
        onPress={handleCheckout}
      >
        <MaterialCommunityIcons
          name="cash"
          size={constants.ICONS_SIZE}
          style={styles.icon}
        />
      </CheckoutButton>

      <FlatList
        contentContainerStyle={styles.list}
        data={cart.cart_itens}
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
  icon: {
    color: colors.ICONS_COLOR,
    marginRight: 10,
  },
});

export default CartScreen;
