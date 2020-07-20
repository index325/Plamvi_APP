import React from "react";

import colors from "../../config/colors";

import { Input } from './styles'

const FormTextInput: React.FC<any> = (props) => {
  const {style, ...otherProps} = props;
  return (
    <Input
      selectionColor={colors.DODGER_BLUE}
      fullwidth
      autoCapitalize="none"
      {...otherProps}
    />
  );
};

export default FormTextInput;
