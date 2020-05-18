import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import RNPickerSelect from 'react-native-picker-select';
import CartContext from '../contexts/cart';
import {Icon} from 'react-native-elements';

class ModalComponent extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      quantidades: [
        {label: '1 Unidade', value: '1'},
        {label: '2 Unidades', value: '2'},
        {label: '3 Unidades', value: '3'},
        {label: '4 Unidades', value: '4'},
        {label: '5 Unidades', value: '5'},
        {label: '6 Unidades', value: '6'},
        {label: '7 Unidades', value: '7'},
        {label: '8 Unidades', value: '8'},
        {label: '9 Unidades', value: '9'},
        {label: '10 Unidades', value: '10'},
      ],
      quantidade: 0,
    };
  }
  placeholder = {
    label: 'Selecione uma quantidade',
    value: null,
    color: '#9EA0A4',
  };
  _adicionarAoCarrinho = async () => {
    await this.context.addToCart(
      this.state.quantidade,
      this.props.modalData.id,
    );
    this.props.modalVisible();
    showMessage({
      message: 'Sucesso!',
      description: `${
        this.props.modalData.name
      } adicionado ao carrinho com sucesso!`,
      type: 'success',
      position: 'bottom',
      floating: true,
    });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              onPress={this.props.modalVisible}
              style={styles.closeView}>
              <View>
                <Icon
                  name="close"
                  style={styles.x}
                  type="material-community"
                  color="#517fa4"
                />
              </View>
            </TouchableHighlight>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Você está comprando: </Text>
              <Text style={styles.modalText}>{this.props.modalData.name}</Text>
            </View>

            <Text>Selecione a quantidade desejada:</Text>
            <RNPickerSelect
              onValueChange={quantidade => this.setState({quantidade})}
              items={this.state.quantidades}
              placeholder={this.placeholder}
            />

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={this._adicionarAoCarrinho}>
              <Text style={styles.textStyle}>Adicionar ao carrinho</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
  },
  closeView: {
    margin: 0,
    display: 'flex',
    alignSelf: 'flex-end',
    bottom: 20,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalComponent;
