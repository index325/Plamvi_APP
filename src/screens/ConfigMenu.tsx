import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import { useNavigation, Link } from "@react-navigation/native";
import MenuConfig from "../components/MenuConfig";

const ConfigMenu: React.FC = () => {
  const navigation = useNavigation();

  const handleChangeInfo = () => {
    navigation.navigate("updateUserScreen");
  };

  return (
    <View style={styles.list}>
        <MenuConfig />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
  },
  list: {
    padding: 20,
  },
  productHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "center",
  },
  box: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 15,
  },
  productPrice: {
    alignSelf: "flex-start",
    flexDirection: "column",
  },
  productImage: {
    borderRadius: 1000,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DA552F",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  productButtonText: {
    fontSize: 16,
    color: "#DA552F",
    fontWeight: "bold",
  },
});

export default ConfigMenu;
