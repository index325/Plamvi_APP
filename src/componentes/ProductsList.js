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

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
    };
  }

  _getClientId = async () => {
    try {
      let userToken = (await AsyncStorage.getItem('clientId')) || 'none';
      return userToken;
    } catch (error) {
      // Error saving data
    }
  };

  handleNavigateToProdutoOverview() {
    console.log('to overview');
  }

  async componentDidMount() {
    let self = this;
    // React.useLayoutEffect(() => {
    //   self.props.navigationHome.setOptions({
    //     headerShown: false,
    //   });
    // }, [self.props.navigationHome]);
    // this.props.navigationHome.setOptions({
    //   headerShown: false,
    // });
    // let token = this._getUserToken();
    let clientId = (await this._getClientId()).toString();
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudGUiOiI1ZTg4MGU1OWNjZjcwZDIwYmM1MzBkYjAiLCJpYXQiOjE1ODYzMzAzMjIsImV4cCI6MTU4Njc2MjMyMn0.QhazgTyZrTwGQhwOjlEygr79N3dpFoyc189VAxVrp3w';
    await axios({
      method: 'get',
      url: constants.API_USER_URL + '/produtos',
      params: {
        idCliente: clientId,
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function(response) {
        self.setState({apiData: response.data.result});
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

  render() {
    return (
      <View>
        <FlatList
          data={this.state.apiData}
          keyExtractor={(item, index) => index.toString()}
          // ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column'}}>
              <TouchableHighlight
                onPress={() => this.handleNavigateToProdutoOverview(item._id)}>
                <Text>{item.descricao}</Text>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    );
  }
}
