import React, { createContext, useState, useEffect } from "react";
import { createOrder as apiCreateOrder } from "../services/checkout";

interface CheckoutInterface {
  createOrder: () => void;
  nextPhase: () => void;
  phases: number;
}

const CheckoutContext = createContext<CheckoutInterface>({phases: 1, createOrder: function(){}, nextPhase: function(){}});

export const CheckoutProvider: React.FC<any> = ({ children }) => {
  const [phases, setPhases] = useState<number>(1);

  function nextPhase() {
    setPhases(phases + 1);
  }

  async function createOrder(){
    await apiCreateOrder();
    nextPhase();
  }

  return (
    <CheckoutContext.Provider value={{phases, createOrder, nextPhase}}>{children}</CheckoutContext.Provider>
  );
};

export default CheckoutContext;
