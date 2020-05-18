import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, StyleSheet, Button} from 'react-native';
import FormTextInput from '../componentes/FormTextInput';
import imageLogo from '../assets/imagens/logo.png';
import colors from '../config/colors';
import constants from '../config/constants';
import FlashMessage from 'react-native-flash-message';
import {View} from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from '../contexts/auth';

export default class Login extends Component {
  static contextType = AuthContext;
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

  handleEmailChange = email => this.setState({email});

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  _getToken = async () => {
    try {
      let userToken = (await AsyncStorage.getItem('@Auth:token')) || false;
      return userToken;
    } catch (error) {
      // Error saving data
    }
  };

  handleLoginPress = async () => {
    await this.context.signIn(this.state.email, this.state.password);
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={constants.IS_IOS ? 'padding' : undefined}>
        <Image source={imageLogo} style={styles.logo} />
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
          <View style={styles.nozIndex}>
            <Button
              title={this.state.loadingText}
              label="Login"
              onPress={this.handleLoginPress}
            />
          </View>

          <View style={styles.joinUsBlock}>
            <Button
              title="Cadastre-se"
              label="Cadastre-se"
              onPress={() => this.props.navigation.navigate('cadastro')}
            />
          </View>

          <FlashMessage position="bottom" />
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
    zIndex: 0,
  },
  nozIndex: {
    zIndex: 0,
  },
});
