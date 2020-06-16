import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProductRoutes from "./Product.routes";
import ConfigRoutes from "./config.routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CartScreen from "../screens/CartScreen";
import CartContext from "../contexts/cart";
import { color } from "react-native-reanimated";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import constants from "../config/constants";

const Tab = createMaterialBottomTabNavigator();

export default function DashboardRoutes() {
  const context = useContext(CartContext);
  const [cartLength, setCartLength] = useState<number>(0);
  const [cartLabel, setCartLabel] = useState<string>("");

  useEffect(() => {
    setCartLength(context.cart.cart_itens.length);
    if (!context.cart.opened){
      setCartLabel("Finalize a compra")
    } else{
      setCartLabel("Carrinho")
    }
  }, [context.cart]);

  const openedView = () => {
    return (
      <View>
        <MaterialCommunityIcons
          name="cart"
          size={constants.ICONS_SIZE}
          style={styles.icon}
        />
        <View>
          <Text style={styles.cartLength}>{cartLength}</Text>
        </View>
      </View>
    );
  };

  const closedView = () => {
    return (
      <View>
        <MaterialCommunityIcons
          name="cash"
          size={constants.ICONS_SIZE}
          style={styles.icon}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      // tabBarOptions={{
      //   activeTintColor: colors.ACTIVE_TAB_COLOR,
      //   inactiveTintColor: "gray",
      //   showIcon: true,
      //   indicatorStyle: { backgroundColor: colors.INDICATOR_COLOR },
      // }}
      activeColor="black"
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={ProductRoutes}
        options={{
          tabBarColor: "#137F7B",
          tabBarLabel: "Produtos",
          tabBarIcon: ({ color }) => (
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="baguette"
                size={constants.ICONS_SIZE}
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
          tabBarColor: "#494EFC",
          tabBarLabel: `${cartLabel}`,
          tabBarIcon: () => (
            <View style={styles.iconView}>
              <View style={styles.iconContainer}>
                {context.cart.opened == false ? closedView() : openedView()}
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ConfigRoutes}
        options={{
          tabBarLabel: "Configurações",
          tabBarColor: "#694fad",
          tabBarIcon: () => (
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="cogs"
                size={constants.ICONS_SIZE}
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
    color: colors.ICONS_COLOR,
  },
  iconContainer: {
    flexDirection: "row",
  },
  cartLength: {
    backgroundColor: colors.ICONS_COLOR,
    borderRadius: 100,
    width: 20,
    height: 20,
    textAlign: "center",
  },
});
