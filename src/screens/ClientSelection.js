import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  // View,
  // Text,
  FlatList,
  Platform,
  TouchableHighlight,
} from 'react-native';
// import {Button as CustomButtom} from '../componentes/Button';
import FormTextInput from '../componentes/FormTextInput';
import imageLogo from '../assets/imagens/logo.png';
import colors from '../config/colors';
import constants from '../config/constants';
import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createAnimatableComponent, View, Text} from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Home from './Home';

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#000',
      }}
    />
  );
};

class ClientSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      teste: '123',
    };
  }
  _getUserToken = async () => {
    try {
      let userToken = (await AsyncStorage.getItem('tokenUser')) || 'none';
      return userToken;
    } catch (error) {
      // Error saving data
    }
  };

  _storeClientId = async id => {
    try {
      await AsyncStorage.setItem('clientId', id);
    } catch (error) {
      // Error saving data
    }
  };

  async componentDidMount() {
    let self = this;
    let token = this._getUserToken();
    token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudGUiOiI1ZTg4MGU1OWNjZjcwZDIwYmM1MzBkYjAiLCJpYXQiOjE1ODYzMzAzMjIsImV4cCI6MTU4Njc2MjMyMn0.QhazgTyZrTwGQhwOjlEygr79N3dpFoyc189VAxVrp3w';
    await axios({
      method: 'get',
      url: constants.API_USER_URL + '/clientes',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function(response) {
        self.setState({apiData: response.data.data});
      })
      .catch(function(error) {
        showMessage({
          message: 'Oops!',
          description: error.response.data.error,
          type: 'danger',
          position: 'bottom',
          floating: true,
        });
      });
  }

  handleNavigateToProdutos(id) {
    console.log(id);
    this._storeClientId(id);
    this.props.navigation.navigate('home');
  }

  render() {
    return (
      <View
        animation="zoomIn"
        delay={200}
        useNativeDriver
        style={styles.container}>
        <View
          style={styles.form}
          ref="parent"
          animation="zoomIn"
          delay={200}
          useNativeDriver>
          <FlatList
            data={this.state.apiData}
            keyExtractor={(item, index) => index.toString()}
            // ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'column'}}>
                <TouchableHighlight
                  onPress={() => this.handleNavigateToProdutos(item._id)}>
                  <Image
                    source={imageLogo}
                    style={styles.imageView}
                    // onClick={() => this.handleNavigateToProdutos()}
                  />
                </TouchableHighlight>
                <Text style={styles.textView}>{item.email}</Text>
              </View>
            )}
          />
          <Image source={imageLogo} style={styles.logo} />
        </View>
      </View>
    );
  }
}

const Stack = createStackNavigator();

const _storeClientNavigation = async navigation => {
  try {
    await AsyncStorage.setItem('clientNavigation', navigation);
  } catch (error) {
    // Error saving data
  }
};

function HomeScreen({navigation}) {
  _storeClientNavigation(navigation)
  return <Home clientNavigation={navigation} />;
}

class Navigator extends Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="clientSelection"
            component={ClientSelection}
            options={{
              headerShown: false,
              title: 'Seleção de estabelecimentos',
            }}
          />
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              title: 'Seleção de produtos',
            }}
          />
          {/* <Stack.Screen
            name="screen2"
            component={Cadastro}
            navigationOptions={{
              headerLeft: null,
            }}
            options={{
              title: 'Cadastro',
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default class App extends Component {
  render() {
    return <Navigator />;
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
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  imageView: {
    width: '50%',
    height: 100,
    margin: 7,
    borderRadius: 7,
  },
  textView: {
    width: '50%',
    textAlignVertical: 'center',
    padding: 10,
    color: '#000',
  },
});
