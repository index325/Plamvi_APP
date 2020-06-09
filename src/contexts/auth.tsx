import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { SignInService } from "../services/auth";

const AuthContext = createContext({ signed: false, user: {}, signIn: function(email: string, password: string) {}, signOut: function() {}, loading: true});

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

interface Response {
  token: string;
  user: User;
}

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser: string | null = await AsyncStorage.getItem("@Auth:user");
      const storageToken: string | null = await AsyncStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else if (!storageUser && !storageToken) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(email: string, password: string) {
    const response: Response | any = await SignInService(email, password);
    if (response) {
      await AsyncStorage.setItem("@Auth:user", JSON.stringify(response.user));
      await AsyncStorage.setItem("@Auth:token", response.token);
      setUser(response.user);
    }
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
