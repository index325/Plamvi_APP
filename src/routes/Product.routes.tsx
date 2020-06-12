import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsList from "../screens/ProductsList";

const ProductStack = createStackNavigator();

const ProductRoutes = () => (
  <ProductStack.Navigator initialRouteName="ProductsList">
    <ProductStack.Screen
      name="ProductsList"
      component={ProductsList}
      options={{
        headerShown: false,
      }}
    />
  </ProductStack.Navigator>
);

export default ProductRoutes;
