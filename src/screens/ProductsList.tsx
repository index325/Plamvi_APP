import React, { Component, useState, useEffect, useContext } from "react";
import { FlatList, TouchableHighlight, StyleSheet, Image } from "react-native";
import constants from "../config/constants";
import axios from "axios";
import { View, Text } from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "../components/modal";
import ProductFlatList from "../components/ProductFlatList";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useNavigation, NavigationProp } from "@react-navigation/native";

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

interface ModalData {
  name: string;
  price: number;
  id: number;
  description: string;
}

interface Props {
  modalData: (arg0: Item) => void;
  modalVisible: () => void;
  item: Item;
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const ProductsList: React.FC<Props> = (props) => {
  const [apiData, setApiData] = useState();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Item | undefined>();

  function _modalVisible() {
    setModalVisible(!modalVisible);
  }

  async function _getClientId() {
    try {
      let userToken = (await AsyncStorage.getItem("clientId")) || "none";
      return userToken;
    } catch (error) {
      // Error saving data
    }
  }

  async function _getUserToken() {
    try {
      let userToken = (await AsyncStorage.getItem("@Auth:token")) || false;
      return userToken;
    } catch (error) {
      // Error saving data
    }
  }

  async function _setModalData(data: Item) {
    await setModalData(data);
  }

  useEffect(() => {
    async function getProductList() {
      let clientId = await _getClientId().toString();

      let token = await _getUserToken();
      await axios({
        method: "get",
        url: constants.API_USER_URL + "/produtos",
        params: {
          customer: "1",
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          setApiData(response.data.result);
        })
        .catch(function (error) {
          showMessage({
            message: "Oops!",
            description: error.response.data.error,
            type: "danger",
            position: "bottom",
            floating: true,
          });
        });
    }
    getProductList();
  }, []);

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        data={apiData}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <ProductFlatList
            item={item}
            modalVisible={_modalVisible}
            modalData={_setModalData}
            visible={modalVisible}
            navigation={props.navigation}
          />
        )}
      />

      <Modal
        modalVisible={_modalVisible}
        visible={modalVisible}
        modalData={modalData}
      />
      <FlashMessage position="bottom" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
  },
  list: {
    padding: 20,
  },
  productHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "center",
  },
  box: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 15,
  },
  productPrice: {
    alignSelf: "flex-start",
    flexDirection: "column",
  },
  productImage: {
    borderRadius: 1000,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DA552F",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  productButtonText: {
    fontSize: 16,
    color: "#DA552F",
    fontWeight: "bold",
  },
});

export default ProductsList;
