import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, StyleSheet, Button} from 'react-native';
import FormTextInput from '../componentes/FormTextInput';
import imageLogo from '../assets/imagens/logo.png';
import colors from '../config/colors';
import constants from '../config/constants';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {View, Text} from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      loadingText: 'Fazer Login',
    };
  }

  handleViewRef = ref => (this.view = ref);

  async componentDidMount() {
    let token = await this._getToken();
    console.log(token);
    if (token) {
      this.props.navigation.navigate('clientSelection');
    }
  }

  handleEmailChange = email => {
    this.setState({email: email});
  };

  handlePasswordChange = password => {
    this.setState({password: password});
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  _storeToken = async token => {
    try {
      await AsyncStorage.setItem('tokenUser', token);
    } catch (error) {
      // Error saving data
    }
  };

  _getToken = async () => {
    try {
      let userToken = (await AsyncStorage.getItem('tokenUser')) || false;
      return userToken;
    } catch (error) {
      // Error saving data
    }
  };

  handleLoginPress = () => {
    this.state.loadingText = 'Carregando...';

    let self = this;
    axios({
      method: 'post',
      url: constants.API_USER_URL + '/login',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      data: {
        email: this.state.email,
        senha: this.state.password,
      },
    })
      .then(function(response) {
        self._storeToken(response.data.token);
        self.state.loading = false;
        self.props.navigation.navigate('clientSelection');
      })
      .catch(function(error) {
        self.state.loading = false;
        self.state.loadingText = 'Fazer Login';
        showMessage({
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={constants.IS_IOS ? 'padding' : undefined}>
        <Image source={imageLogo} style={styles.logo} />
        {/* <View animation="zoomIn" delay={200} useNativeDriver> */}
        {/* </View> */}
        <View
          style={styles.form}
          ref="parent"
          animation="zoomIn"
          delay={200}
          useNativeDriver>
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
          <Button
            title={this.state.loadingText}
            label="Login"
            onPress={this.handleLoginPress}
          />
          <View style={styles.joinUsBlock}>
            <Button
              title="Cadastre-se"
              label="Login"
              onPress={() => this.props.navigation.navigate('screen2')}
            />
          </View>

          <FlashMessage position="top" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export class Cadastro extends React.Component {
  render(props) {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.smallLogo} />
        <Text style={styles.paragraph}>
          <Text style={{fontWeight: 'normal'}}>
            Now you should have a basic understanding of how this app works.
            Please sign up and take part in this fantastic user experience!
          </Text>
        </Text>
        <Text style={styles.paragraph}>
          This is the last page of the onboarding.
        </Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
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
  largeLogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  smallLogo: {
    flex: 1,
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  joinUsBlock: {
    marginTop: 20,
  },
});
