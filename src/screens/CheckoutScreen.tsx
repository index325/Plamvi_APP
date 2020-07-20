import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import CartContext from "../contexts/Cart";
import CheckoutProductsList from "../components/CheckoutProductsList";
import CheckoutButton from "../components/CheckoutButton";
import ClientContext from "../contexts/Client";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../config/colors";
import constants from "../config/constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CheckoutContext from "../contexts/Checkout";

const CheckoutScreen: React.FC = (props) => {
  const cartContext = useContext(CartContext);
  const clientContext = useContext(ClientContext);
  const checkoutContext = useContext(CheckoutContext);
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    setCartItems(cartContext.cart.cart_itens);
  }, [cartContext.cart]);

  const handleNextPage = () => {
    checkoutContext.createOrder();
  }

  const handleGoToProducts = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.clientView}>
          <Text style={styles.clientWhere}> Você está comprando em:</Text>
          <Text style={styles.clientName}>{clientContext.client.name}</Text>
        </View>
      <View style={styles.box}>
        
        <Text style={styles.checkoutInformation}>
          Verifique os dados abaixo:
        </Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => <CheckoutProductsList data={item} />}
        />
      </View>
      <View>
        <CheckoutButton label="Continuar" onPress={handleNextPage}>
          <Icon
            name="arrow-right"
            size={constants.ICONS_SIZE}
            style={styles.icon}
          />
        </CheckoutButton>
        <CheckoutButton label="Adicionar mais produtos" onPress={handleGoToProducts}>
          <Icon
            name="plus"
            size={constants.ICONS_SIZE}
            style={styles.icon}
          />
        </CheckoutButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    backgroundColor: "white",
  },
  container: {
    padding: 10,
  },
  checkoutInformation: {
    fontSize: 20,
    marginBottom: 20,
  },
  clientView: {
    alignItems: "center",
    marginBottom: 10,
  },
  clientName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  clientWhere: {
    fontSize: 14,
  },
  icon: {
    color: colors.ICONS_COLOR,
    marginRight: 10
  },
});

export default CheckoutScreen;
