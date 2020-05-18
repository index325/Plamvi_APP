import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import CartContext from '../contexts/cart';
import CartListing from '../componentes/CartListing';

export default class CartScreen extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      cartItens: [],
      modalVisible: false,
      modalData: {
        name: '',
        price: 0.0,
        id: 0,
        description: '',
      },
    };
    this._modalVisible = this._modalVisible.bind(this);
  }
  _modalVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  componentDidMount = async () => {
    await this.setState({cartItens: this.context.cart});
  };
  render() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.cartItens}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CartListing
              item={item}
              modalVisible={this._modalVisible}
              modalData={this._setModalData}
              visible={this.state.modalVisible}
              navigation={this.props.navigation}
            />
          )}
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
});
