import React, { Component, useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import RNPickerSelect from "react-native-picker-select";
import CartContext from "../../contexts/cart";
import { Icon } from "react-native-elements";

import {
  Container,
  Content,
  CloseModalButton,
  OpenButton,
  IconContainer,
  ModalText,
  FooterText
} from './styles'

interface Item {
  product: Product;
  description: string;
  id: number;
  name: string;
  price: number;
}

interface Product {
  name: string;
  price: number;
}

interface Props {
  modalData: Item | undefined;
  modalVisible: () => void;
  visible: boolean;
}

const ModalComponent: React.FC<Props> = (props) => {
  const [quantidade, setQuantidade] = useState<number>(0);
  const [quantidades, setQuantidades] = useState<
    { label: string; value: string }[]
  >([
    { label: "1 Unidade", value: "1" },
    { label: "2 Unidades", value: "2" },
    { label: "3 Unidades", value: "3" },
    { label: "4 Unidades", value: "4" },
    { label: "5 Unidades", value: "5" },
    { label: "6 Unidades", value: "6" },
    { label: "7 Unidades", value: "7" },
    { label: "8 Unidades", value: "8" },
    { label: "9 Unidades", value: "9" },
    { label: "10 Unidades", value: "10" },
  ]);

  const context = useContext(CartContext);

  const placeholder = {
    label: "Selecione uma quantidade",
    value: null,
    color: "#9EA0A4",
  };

  async function _adicionarAoCarrinho() {
    await context.addToCart(quantidade, props.modalData ? props.modalData.id : 0);

    props.modalVisible();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
    >
      <Container>
        <Content style={styles.modalViewShadow}>
          <CloseModalButton onPress={props.modalVisible}>
            <IconContainer>
              <Icon
                name="close"
                type="material-community"
                color="#517fa4"
              />
            </IconContainer>
          </CloseModalButton>
          <View>
            <Text>Você está comprando: </Text>
            <ModalText>{props.modalData ? props.modalData.name : ''}</ModalText>
          </View>

          <Text>Selecione a quantidade desejada:</Text>
          <RNPickerSelect
            onValueChange={(quantidade) => setQuantidade(quantidade)}
            items={quantidades}
            placeholder={placeholder}
          />

          <OpenButton
            style={{ elevation: 2 }}
            onPress={_adicionarAoCarrinho}
          >
            <FooterText>Adicionar ao carrinho</FooterText>
          </OpenButton>
        </Content>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalViewShadow: { 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ModalComponent;
