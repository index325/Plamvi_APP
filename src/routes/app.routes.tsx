import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardRoute from "./Dashboard.routes";
import ClientSelection from "../screens/ClientSelection";
import LogoutComponent from "../components/Logout";
import { CartProvider } from "../contexts/cart";
import { useNavigation } from "@react-navigation/native";

const AppStack = createStackNavigator();

const AppRoutes = () => {
  return (
    <CartProvider>
      <AppStack.Navigator>
        <AppStack.Screen
          name="clientSelection"
          component={ClientSelection}
          options={{
            headerShown: false,
            headerLeft: undefined,
            title: "Seleção de estabelecimentos",
          }}
        />
        <AppStack.Screen
          name="dashboard"
          component={DashboardRoute}
          options={{
            title: "Catálogo de produtos",
            headerRight: () => <LogoutComponent />,
          }}
        />
      </AppStack.Navigator>
    </CartProvider>
  );
};

export default AppRoutes;
