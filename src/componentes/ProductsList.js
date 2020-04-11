import React, {Component} from 'react';
import {FlatList, TouchableHighlight} from 'react-native';
import constants from '../config/constants';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {View, Text} from 'react-native-animatable';
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
