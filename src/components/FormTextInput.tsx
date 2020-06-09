import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../config/colors";

const FormTextInput: React.FC<any> = (props) => {
  const {style, ...otherProps} = props;
  return (
    <TextInput
      selectionColor={colors.DODGER_BLUE}
      style={[styles.textInput]}
      fullwidth
      autoCapitalize="none"
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
});

export default FormTextInput;
