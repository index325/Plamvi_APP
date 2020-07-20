import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import constants from "../config/constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckoutButton: React.FC<any> = (props) => {
  const { label, onPress, disabled } = props;

  return (
    <View style={{ padding: 5 }}>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {props.children}
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: colors.DODGER_BLUE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)",
  },
  text: {
    color: colors.WHITE,
    textAlign: "center",
    height: 20,
  },
  icon: {
    color: colors.ICONS_COLOR,
    marginRight: 10
  },
});

export default CheckoutButton;
