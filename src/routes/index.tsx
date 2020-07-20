import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./Auth.routes";

import AuthContext from "../contexts/Auth";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.viewContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Routes;
