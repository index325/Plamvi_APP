import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import ProductsList from '../components/ProductsList';
import ProductRoutes from "./Product.routes";
// import {Icon} from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-ionicons';
// import { Feather as Icon } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CartScreen from "../screens/CartScreen";
import CartContext from "../contexts/cart";
const Tab = createMaterialTopTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function DashboardRoutes() {
  const context = useContext(CartContext);
  const [cartLength, setCartLength] = useState<number>(0);

  useEffect(() => {
    setCartLength(context.cart.length);
  }, [context.cart]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showIcon: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProductRoutes}
        options={{
          tabBarLabel: "Produtos",
          tabBarIcon: ({ color }) => (
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="baguette"
                size={14}
                style={styles.icon}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Carrinho",
          tabBarIcon: () => (
            <View style={styles.iconView}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="cart"
                  size={14}
                  style={styles.icon}
                />
                <View style={styles.cartLengthView}>
                  <Text style={styles.cartLength}>{cartLength}</Text>
                </View>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: () => (
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="cogs"
                size={14}
                style={styles.icon}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconView: {
    alignItems: "center",
  },
  icon: {
    color: "tomato",
  },
  iconContainer: {
    flexDirection: "row",
  },
  cartLength: {
    backgroundColor: "tomato",
    borderRadius: 100,
    width: 20,
    height: 20,
    textAlign: "center",
  },
});
