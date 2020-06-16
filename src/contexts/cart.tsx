import React, { createContext, useState, useEffect } from "react";
import { getCartService, addProductToCartService } from "../services/cart";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface Cart {
  cart_itens: Array<CartItem>;
  createdAt: string,
  id: number,
  opened: boolean,
  updatedAt: string,
  user_id: number,
}

interface CartInterface {
  cart: CartItem | any;
  addToCart: (quantity: number, product: any) => void;
  getCart: () => void;
}

const CartContext = createContext<CartInterface>({
  cart: {},
  addToCart: function (quantity: number, product: any) {},
  getCart: function () {},
});

export const CartProvider: React.FC<CartInterface> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    cart_itens: [],
    createdAt: "",
    id: 0,
    opened: true,
    updatedAt: "",
    user_id: 0,
  });

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    const response = await getCartService();
    if (response) {
      setCart(response);
    }
  }

  async function addToCart(quantity: number, product: number) {
    const response = await addProductToCartService(quantity, product);
    if (response) {
      setCart(response);
    }
  }

  return (
    <CartContext.Provider value={{ cart, getCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
