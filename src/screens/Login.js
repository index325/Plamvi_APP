import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import Button from '../componentes/Button';
import FormTextInput from '../componentes/FormTextInput';
import imageLogo from '../assets/imagens/logo.png';
import colors from '../config/colors';
import constants from '../config/constants';

// interface State {
//   email: string;
//   password: string;
// }

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (email) => {
    this.setState({email: email});
  };

  handlePasswordChange = (password) => {
    this.setState({password: password});
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleLoginPress = () => {
    console.log('Login button pressed');
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={constants.IS_IOS ? "padding" : undefined}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            onSubmitEditing={this.handleEmailSubmitPress}
            placeholder="E-mail"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <FormTextInput
            ref={this.passwordInputRef}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder="Password"
            secureTextEntry={true}
            returnKeyType="done"
          />
          <Button label="Login" onPress={this.handleLoginPress} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
});
