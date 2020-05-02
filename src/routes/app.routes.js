import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardRoute from './Dashboard.routes';
import ClientSelection from '../screens/ClientSelection';
import LogoutComponent from '../componentes/Logout';
import {CartProvider} from '../contexts/cart';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <CartProvider>
    <AppStack.Navigator>
      <AppStack.Screen
        name="clientSelection"
        component={ClientSelection}
        options={{
          headerShown: false,
          headerLeft: null,
          title: 'Seleção de estabelecimentos',
        }}
      />
      <AppStack.Screen
        name="dashboard"
        component={DashboardRoute}
        options={{
          title: 'Seleção de estabelecimentos',
          headerRight: () => <LogoutComponent navigation={this.navigation} />,
        }}
      />
    </AppStack.Navigator>
  </CartProvider>
);

export default AppRoutes;
