import React, {Component} from 'react';
import {FlatList, TouchableHighlight, StyleSheet, Image} from 'react-native';
import constants from '../config/constants';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {View, Text} from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import CartContext from '../contexts/cart';
import Modal from '../componentes/modal';
import ProductFlatList from '../componentes/ProductFlatList';

export default class ProductsList extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      modalVisible: false,
      modalData: {
        nome: '',
        preco: 0.0,
        _id: 0,
        descricao: '',
      },
    };
    this._modalVisible = this._modalVisible.bind(this);
  }

  _modalVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  _getClientId = async () => {
    try {
      let userToken = (await AsyncStorage.getItem('clientId')) || 'none';
      return userToken;
    } catch (error) {
      // Error saving data
    }
  };

  _getUserToken = async () => {
    try {
      let userToken = (await AsyncStorage.getItem('@Auth:token')) || false;
      return userToken;
    } catch (error) {
      // Error saving data
    }
  };

  _setModalData = data => {
    this.setState({modalData: data});
    console.log(data);
  };

  handleNavigateToProdutoOverview() {
    console.log('to overview');
    this.props.navigation.navigate('ProductOverview');
  }

  async componentDidMount() {
    let self = this;

    let clientId = (await this._getClientId()).toString();
    let token = await this._getUserToken();
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
          contentContainerStyle={styles.list}
          data={this.state.apiData}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <ProductFlatList
              item={item}
              modalVisible={this._modalVisible}
              modalData={this._setModalData}
              visible={this.state.modalVisible}
            />
          )}
        />

        <Modal
          modalVisible={this._modalVisible}
          visible={this.state.modalVisible}
          modalData={this.state.modalData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  list: {
    padding: 20,
  },
  productHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center',
  },
  box: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 15,
  },
  productPrice: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },
  productImage: {
    borderRadius: 1000,
    width: 100,
    height: 100,
    alignSelf: 'center',
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
    flex: 1,
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
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
