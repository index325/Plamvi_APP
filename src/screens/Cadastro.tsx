import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, Button } from "react-native";
// import styles from '../estilo/Padrao';
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import axios from "axios";
import constants from "../config/constants";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

interface IBGEUFResponse {
  nome: string;
  sigla: string;
  id: number;
}

interface IBGECityResponse {
  nome: string;
}

const Cadastro: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("0");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [ibgeCities, setIbgeCities] = useState<string[] | any>([]);
  const [ibgeStates, setIbgeStates] = useState<string[] | any>([]);
  const [cityDisabled, setCityDisabled] = useState<boolean>(true);

  const navigation = useNavigation();

  function handleEmailChange(email: string) {
    setEmail(email);
  }

  function handlePasswordChange(password: string) {
    setPassword(password);
  }

  function handlePasswordConfirmChange(passwordConfirm: string) {
    setPasswordConfirm(passwordConfirm);
  }

  function handleNameChange(name: string) {
    setName(name);
  }

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => ({
          value: uf.sigla,
          label: uf.nome,
          key: uf.id,
        }));
        setIbgeStates(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (state === "0") {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => ({
          value: city.nome,
          label: city.nome,
          key: city.nome,
        }));
        setIbgeCities(cityNames);
      });
  }, [state]);

  async function handleRegisterPress() {
    if (password !== passwordConfirm) {
      showMessage({
        message: "Oops!",
        description: "As senhas não são iguais",
        type: "danger",
        position: "bottom",
        floating: true,
      });
      return false;
    }
    axios({
      method: "post",
      url: constants.API_USER_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      data: {
        email,
        password,
      },
    })
      .then(async (response) => {
        await showMessage({
          message: "Sucesso!",
          description: "Você se cadastrou com sucesso. Agora, faça o login!",
          type: "success",
          position: "bottom",
          floating: true,
        });
        navigation.navigate("loginScreen");
      })
      .catch(async function (error) {
        await showMessage({
          message: "Oops!",
          description: error.response.data.error,
          type: "danger",
          position: "bottom",
          floating: true,
        });
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.formFieldContainer}>
        <FormTextInput
          value={email}
          onChangeText={handleEmailChange}
          placeholder="E-mail"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <FormTextInput
          value={name}
          onChangeText={handleNameChange}
          placeholder="Nome"
          autoCorrect={true}
          autoCapitalize="words"
        />
        <View style={pickerSelectStyles.inputAndroid}>
          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            onValueChange={(state) => {
              console.log(state)
              if (state) {
                setCityDisabled(false);
              } else {
                setCityDisabled(true);
              }
              setState(state);
            }}
            items={ibgeStates}
            placeholder={{
              label: "Selecione um estado",
              value: null,
              color: "#9EA0A4",
            }}
          />
        </View>
        <View style={pickerSelectStyles.inputAndroid}>
          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            disabled={cityDisabled}
            onValueChange={(city) => setCity(city)}
            items={ibgeCities}
            placeholder={{
              label: cityDisabled
                ? "Selecione um estado primeiro"
                : "Selecione uma cidade",
              value: null,
              color: "#9EA0A4",
            }}
          />
        </View>
        <FormTextInput
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Senha"
          secureTextEntry={true}
        />
        <FormTextInput
          value={passwordConfirm}
          onChangeText={handlePasswordConfirmChange}
          placeholder="Confirmação de Senha"
          secureTextEntry={true}
        />
      </View>
      <Button title="Registrar" onPress={handleRegisterPress} />
      <FlashMessage position="bottom" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    margin: 10,
    // flex: 1,
    borderRadius: 10,
    borderColor: "#fafafa",
  },
  formFieldContainer: {
    width: "80%",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    alignItems: "center",
    // paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 8,
    color: "black",
    marginVertical: 5,
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Cadastro;
