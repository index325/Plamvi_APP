// import Login from './src/routes/Main.routes';

// export default Login;

import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";

import { AuthProvider } from "./src/contexts/auth";
import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
      <FlashMessage position="bottom" />
    </>
  );
}
