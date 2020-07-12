import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import MenuConfig from "../components/MenuConfig";

const ConfigMenu: React.FC = () => {
  return (
    <ScrollView style={styles.list}>
        <MenuConfig />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
});

export default ConfigMenu;
