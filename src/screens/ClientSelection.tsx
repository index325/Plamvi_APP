import React, { Component, useState, useEffect, useContext } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  Platform,
  TouchableHighlight,
} from "react-native";
import colors from "../config/colors";
import constants from "../config/constants";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { View, Text } from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";
import AuthContext from "../contexts/auth";
import ClientContext from "../contexts/client";
import { useNavigation } from "@react-navigation/native";

const ClientSelection = () => {
  const [apiData, setApiData] = useState();

  const context = useContext(AuthContext);
  const clientContext = useContext(ClientContext);
  const navigation = useNavigation();

  async function _getUserToken() {
    try {
      let userToken = (await AsyncStorage.getItem("@Auth:token")) || false;
      return userToken;
    } catch (error) {
      // Error saving data
    }
  }

  async function _storeClientId(id: number) {
    try {
      await AsyncStorage.setItem("clientId", id.toString());
    } catch (error) {
      // Error saving data
    }
  }

  async function _redirectToLogin() {
    context.signOut();
  }

  useEffect(() => {
    console.log("aaaa");
    async function getClients() {
      let token = await _getUserToken();
      console.log(token);
      await axios({
        method: "get",
        url: `${constants.API_URL}/users/list_all_available_customers`,
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setApiData(response.data);
        })
        .catch(function (error) {
          console.log(error.response.data);
          _redirectToLogin();
          if (error.status == 401) {
            _redirectToLogin();
          }
          showMessage({
            message: "Oops!",
            description: error.response.data.error,
            type: "danger",
            position: "bottom",
            floating: true,
          });
        });
    }

    getClients();
  }, []);

  async function handleNavigateToProdutos(item: any) {
    _storeClientId(item.id);
    const data = {
      name: item.name,
      email: item.email,
      id: item.id,
    };
    clientContext.setClientData(data);

    navigation.navigate("dashboard");
  }

  return (
    <View
      animation="zoomIn"
      delay={200}
      useNativeDriver
      style={styles.container}
    >
      <View style={styles.form} animation="zoomIn" delay={200} useNativeDriver>
        <FlatList
          data={apiData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            console.log("a");
            return (
              <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{item.email}</Text>
                <TouchableHighlight
                  underlayColor="#FAFAFA"
                  style={styles.productButton}
                  onPress={() => handleNavigateToProdutos(item)}
                >
                  <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableHighlight>
              </View>
            );
          }}
        />
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
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
    resizeMode: "contain",
    alignSelf: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  joinUsBlock: {
    marginTop: 20,
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 5,
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  imageView: {
    width: "50%",
    height: 100,
    margin: 7,
    borderRadius: 7,
  },
  textView: {
    width: "50%",
    textAlignVertical: "center",
    padding: 10,
    color: "#000",
  },
  list: {
    padding: 20,
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
  imageContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default ClientSelection;
