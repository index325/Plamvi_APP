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

interface CartInterface {
  cart: CartItem | any;
  addToCart: (quantity: number, product: any) => void;
  getCart: () => void;
}


const CartContext = createContext<CartInterface>({ cart: [{}], addToCart: function(quantity: number, product: any){}, getCart: function() {} });

export const CartProvider: React.FC<any> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    const response: Promise<CartItem> | undefined = await getCartService();
    if (response) {
      setCart(response);
    }
  }

  async function addToCart(quantity: number, product: number) {
    const response = await addProductToCartService(quantity, product);
    console.log(response);
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
