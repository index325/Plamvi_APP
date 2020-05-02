import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
  Platform,
  TouchableHighlight,
} from 'react-native';
import imageLogo from '../assets/imagens/logo.png';
import colors from '../config/colors';
import constants from '../config/constants';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {View, Text} from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class ClientSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      teste: '123',
    };
  }
  _getUserToken = async () => {
    try {
      let userToken = (await AsyncStorage.getItem('@Auth:token')) || false;
      console.log(2)
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
    let token = await this._getUserToken();
    console.log(3);
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
        console.log(error);
        showMessage({
          message: 'Oops!',
          description: error.response.data.error,
          type: 'danger',
          position: 'bottom',
          floating: true,
        });
      });
  }

  async handleNavigateToProdutos(id) {
    console.log(id);
    this._storeClientId(id);
    this.props.navigation.navigate('dashboard');
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
            contentContainerStyle={styles.list}
            renderItem={({item}) => (
              <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{item.email}</Text>
                <TouchableHighlight
                  underlayColor="#FAFAFA"
                  style={styles.productButton}
                  onPress={() => this.handleNavigateToProdutos(item._id)}>
                  <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableHighlight>
              </View>
            )}
          />
          <Image source={imageLogo} style={styles.logo} />
        </View>
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
  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold',
  },
});
