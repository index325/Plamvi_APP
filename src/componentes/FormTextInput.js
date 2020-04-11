import React, {Component} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import colors from '../config/colors';

class FormTextInput extends Component {
  //   textInputRef = React.createRef<TextInput>();

  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  render(props) {
    const {style, ...otherProps} = this.props;
    return (
      <TextInput
        ref={this.textInputRef}
        selectionColor={colors.DODGER_BLUE}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});

export default FormTextInput;
