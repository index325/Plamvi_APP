import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SignInService} from '../services/auth';

const AuthContext = createContext({signed: false, user: {}});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@Auth:user');
      const storageToken = await AsyncStorage.getItem('@Auth:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else if (!storageUser && !storageToken) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(email, password) {
    const response = await SignInService(email, password);

    await AsyncStorage.setItem('@Auth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@Auth:token', response.token);
    setUser(response.user);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
