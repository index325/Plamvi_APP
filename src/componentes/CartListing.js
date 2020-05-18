import React from 'react';
import {View, Text} from 'react-native-animatable';
import {TouchableHighlight, StyleSheet, Image} from 'react-native';

export default class CartListing extends React.Component {
  handleVisible = () => {
    this.props.modalVisible();
  };
  handleModalData = data => {
    this.props.modalData(data);
  };
  handleNavigateToProdutoOverview(id) {
    this.props.navigation.navigate('ProductOverview');
  }
  componentDidMount() {
    console.log(this.props.item.product.name);
  }
  render() {
    return (
      <View style={styles.box}>
        <Image
          style={styles.productImage}
          source={require('../assets/imagens/product.jpg')}
        />
        <View style={styles.productInfo}>
          <View style={styles.productHead}>
            <Text style={styles.productTitle}>
              {this.props.item.product.name}
            </Text>
            <Text style={styles.productPrice}>
              R$ {this.props.item.product.price}
            </Text>
          </View>
          <Text>{this.props.item.descricao}</Text>
          <TouchableHighlight
            underlayColor="#FAFAFA"
            style={styles.productButton}
            onPress={() => {
              this.handleNavigateToProdutoOverview(this.props.item.id);
            }}>
            <Text style={styles.productButtonText}>Ver Detalhes</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#FAFAFA"
            style={styles.productButton}
            onPress={() => {
              this.handleModalData(this.props.item);
              this.handleVisible();
            }}>
            <Text style={styles.productButtonText}>Comprar</Text>
          </TouchableHighlight>
        </View>
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
    // flex: 1,
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
