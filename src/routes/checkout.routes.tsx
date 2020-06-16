import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckoutScreen from "../screens/CheckoutScreen";
import { CheckoutProvider } from "../contexts/checkout";
import colors from "../config/colors";

const CheckoutStack = createStackNavigator();

const CheckoutRoutes = () => {
  return (
    <CheckoutProvider>
      <CheckoutStack.Navigator initialRouteName="checkoutOverview">
        <CheckoutStack.Screen
          name="checkoutOverview"
          component={CheckoutScreen}
          options={{
            headerShown: false,
          }}
        />
      </CheckoutStack.Navigator>
    </CheckoutProvider>
  );
};

export default CheckoutRoutes;
