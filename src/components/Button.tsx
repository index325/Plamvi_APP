import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

const Button: React.FC<any> = (props) => {
  const { label, onPress, disabled } = props;

  let view;
  console.log(disabled);
  if (disabled) {
    view = (
      <TouchableOpacity style={styles.disabledContainer} onPress={onPress} disabled={disabled}>
        <Text style={styles.textDisabled}>Preencha o formulário corretamente</Text>
      </TouchableOpacity>
    );
  } else {
    view = (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return <>{view}</>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.DODGER_BLUE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)",
  },
  disabledContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
  },
  textDisabled: {
    color: colors.BLACK,
    textAlign: "center",
    height: 20,
  },
  text: {
    color: colors.WHITE,
    textAlign: "center",
    height: 20,
  },
});

export default Button;
