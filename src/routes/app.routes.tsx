import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardRoute from "./Dashboard.routes";
import ClientSelection from "../screens/ClientSelection";
import UpdateUser from "../screens/UpdateUser";
import LogoutComponent from "../components/Logout";
import { CartProvider } from "../contexts/cart";
import { useNavigation } from "@react-navigation/native";
import ProductOverview from "../screens/ProductOverview";
import colors from "../config/colors";

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
            headerStyle: { backgroundColor: colors.HEADER_COLOR },
          }}
        />
        <AppStack.Screen
          name="updateUserScreen"
          component={UpdateUser}
          options={{
            title: "Atualização de dados do usuário",
            headerStyle: { backgroundColor: colors.HEADER_COLOR },
          }}
        />
        <AppStack.Screen
          name="ProductOverview"
          component={ProductOverview}
          options={{
            title: "Detalhe do produto",
            headerStyle: { backgroundColor: colors.HEADER_COLOR },
          }}
        />
      </AppStack.Navigator>
    </CartProvider>
  );
};

export default AppRoutes;
