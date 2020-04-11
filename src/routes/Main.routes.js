import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import ClientSelection from '../screens/ClientSelection';
import LogoutComponent from '../componentes/Logout';

import DashboardRoute from './Dashboard.routes';

const Stack = createStackNavigator();

export default class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="loginScreen">
          <Stack.Screen
            name="loginScreen"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="cadastro"
            component={Cadastro}
            navigationOptions={{
              headerLeft: null,
            }}
            options={{
              title: 'Cadastro',
            }}
          />
          <Stack.Screen
            name="clientSelection"
            component={ClientSelection}
            options={{
              headerShown: false,
              headerLeft: null,
              title: 'Seleção de estabelecimentos',
            }}
          />
          <Stack.Screen
            name="dashboard"
            component={DashboardRoute}
            options={{
              title: 'Seleção de estabelecimentos',
              headerRight: () => (
                <LogoutComponent navigation={this.navigation} />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
