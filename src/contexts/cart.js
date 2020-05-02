import React, {createContext, useState, useEffect} from 'react';
import {getCartService, addProductToCartService} from '../services/cart';

const CartContext = createContext({signed: false, cart: [{}]});

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    const response = await getCartService();
    setCart(response);
  }

  async function addToCart(quantity, product) {
    const response = await addProductToCartService(quantity, product);
    setCart(response);
  }

  return <CartContext.Provider value={{cart}}>{children}</CartContext.Provider>;
};

export default CartContext;
