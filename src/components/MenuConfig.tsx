import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { useNavigation, Link } from "@react-navigation/native";
import Button from "./Button";

const MenuConfig: React.FC = () => {
  const navigation = useNavigation();

  const handleChangeInfo = () => {
    navigation.navigate("updateUserScreen");
  };

  return (
    <View style={styles.box}>
      <Button label="Alterar Informações" onPress={handleChangeInfo} />
    </View>
  );
};

export default MenuConfig;

const styles = StyleSheet.create({
  box: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDD",
    marginVertical: 5,
  },
});
