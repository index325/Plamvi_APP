import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsList from '../componentes/ProductsList';
import ProductOverview from '../screens/ProductOverview';

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
    <ProductStack.Screen name="ProductOverview" component={ProductOverview} />
  </ProductStack.Navigator>
);

export default ProductRoutes;
