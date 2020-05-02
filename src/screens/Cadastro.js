import React from 'react';
import {Image, StyleSheet, View, Text, Button} from 'react-native';
import imageLogo from '../assets/imagens/logo.png';
// import styles from '../estilo/Padrao';
import FormTextInput from '../componentes/FormTextInput';
import colors from '../config/colors';
import axios from 'axios';
import constants from '../config/constants';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';

export default class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      cidade: '',
      estado: '',
      password: '',
      passwordConfirm: '',
    };
  }
  handleEmailChange = email => {
    this.setState({email: email});
  };

  handlePasswordChange = password => {
    this.setState({password: password});
  };

  handlePasswordConfirmChange = passwordConfirm => {
    this.setState({passwordConfirm: passwordConfirm});
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleRegisterPress = async () => {
    if (this.state.password !== this.state.passwordConfirm) {
      showMessage({
        message: 'Oops!',
        description: 'As senhas não são iguais',
        type: 'danger',
        position: 'bottom',
        floating: true,
      });
      return false;
    }

    let self = this;
    axios({
      method: 'post',
      url: constants.API_USER_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      data: {
        email: this.state.email,
        senha: this.state.password,
      },
    })
      .then(async function(response) {
        await showMessage({
          message: 'Sucesso!',
          description: 'Você se cadastrou com sucesso. Agora, faça o login!',
          type: 'success',
          position: 'bottom',
          floating: true,
        });
        self.props.navigation.navigate('loginScreen');
      })
      .catch(async function(error) {
        await showMessage({
          message: 'Oops!',
          description: error.response.data.error,
          type: 'danger',
          position: 'bottom',
          floating: true,
        });
      });
  };
  render() {
    return (
      <View style={styles.container}>
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
          placeholder="Senha"
          secureTextEntry={true}
          returnKeyType="done"
        />
        <FormTextInput
          ref={this.passwordInputRef}
          value={this.state.passwordConfirm}
          onChangeText={this.handlePasswordConfirmChange}
          placeholder="Confirmação de Senha"
          secureTextEntry={true}
          returnKeyType="done"
        />
        <Button title="Registrar" onPress={this.handleRegisterPress} />
        <FlashMessage position="bottom" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    margin: 10,
    // flex: 1,
    borderRadius: 10,
    borderColor: '#fafafa',
  },
});
