import React, { createContext, useState, useEffect } from "react";
import { getCartService, addProductToCartService } from "../services/cart";

interface ClientInterface {}

interface Client {
  email: string;
  name: string;
  id: number;
}

const ClientContext = createContext<any>({ client: {}, setClientData: function(data: Client) {} });

export const ClientProvider: React.FC<any> = ({ children }) => {
  const [client, setClient] = useState<Client>({
    email: "",
    name: "",
    id: 0,
  });

  function setClientData(data: Client) {
    setClient({
      email: data.email,
      name: data.name,
      id: data.id,
    });
  }

  return (
    <ClientContext.Provider value={{client, setClientData}}>{children}</ClientContext.Provider>
  );
};

export default ClientContext;
