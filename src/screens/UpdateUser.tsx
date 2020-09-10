import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  View,
} from "react-native";

import UserForm from "../components/forms/UserForm";
import colors from "../config/colors";
import axios from "axios";
import constants from "../config/constants";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";

import { Formik } from "formik";

import AsyncStorage from "@react-native-community/async-storage";

interface IBGEUFResponse {
  nome: string;
  sigla: string;
  id: number;
}

interface IBGECityResponse {
  nome: string;
}

interface ApiData {
  id: number;
  name: string;
  email: string;
  state: string;
  city: string;
}

const UpdateUser: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("0");
  const [apiData, setApiData] = useState<ApiData>({
    id: 0,
    name: "",
    email: "",
    state: "",
    city: "Araraquara",
  });
  const [ibgeCities, setIbgeCities] = useState<string[] | any>([]);
  const [ibgeStates, setIbgeStates] = useState<string[] | any>([]);
  const [cityDisabled, setCityDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  async function _getUserToken() {
    try {
      let userToken = (await AsyncStorage.getItem("@Auth:token")) || false;
      return userToken;
    } catch (error) {
      // Error saving data
    }
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
          key: uf.sigla,
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

  useEffect(() => {
    async function getInformation() {
      let token = await _getUserToken();
      await axios({
        method: "get",
        url: constants.API_URL + "/users",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setApiData(response.data);
          setLoading(false);
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

    getInformation();
  }, []);

  if (loading) {
    return (
      <View style={styles.viewContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      // style={styles.container}
      behavior={constants.IS_IOS ? "padding" : undefined}
    >
      <Formik
        initialValues={{
          email: email,
          password: "",
          name: name,
          passwordConfirm: "",
          state: state,
          city: city,
        }}
        onSubmit={async (values, { setErrors }) => {
          if (state === null || state === "0") {
            setErrors({ state: "Este campo é obrigatório" });
            return
          }
          if (city === null || city === "0") {
            setErrors({ city: "Este campo é obrigatório" });
            return
          }
          if (values.password !== values.passwordConfirm) {
            showMessage({
              message: "Oops!",
              description: "As senhas não são iguais",
              type: "danger",
              position: "bottom",
              floating: true,
            });
            setErrors({ passwordConfirm: "As senhas não são iguais" });
            return false;
          }
          let token = await _getUserToken();
          axios({
            method: "put",
            url: `${constants.API_URL}` + "/users",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
            data: {
              id: apiData.id,
              email: values.email,
              password: values.password,
              name: values.name,
              state,
              city,
            },
          })
            .then(async (response) => {
              
              await showMessage({
                message: "Sucesso!",
                description:
                  "Você atualizou os seus dados com sucesso!",
                type: "success",
                position: "bottom",
                floating: true,
              });
              navigation.navigate("configMenu");
            })
            .catch(async (error) => {
              await showMessage({
                message: "Oops!",
                description: error.response.data.error,
                type: "danger",
                position: "bottom",
                floating: true,
              });
            });
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email("Digite um e-mail válido")
            .required("Este campo é obrigatório"),
          password: yup
            .string()
            .min(6, "Digite uma senha com mais de 6 carácteres")
            .required("Este campo é obrigatório"),
          passwordConfirm: yup
            .string()
            .min(6, "Digite uma senha com mais de 6 carácteres")
            .required("Este campo é obrigatório"),
          name: yup.string().required("Este campo é obrigatório"),
        })}
      >
        {({
          values,
          initialValues,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          setErrors,
          setFieldValue
        }) => (
          <UserForm
            values={values}
            // initialValues={initialValues}
            handleSubmit={handleSubmit}
            setErrors={setErrors}
            isValid={isValid}
            touched={touched}
            setFieldTouched={setFieldTouched}
            errors={errors}
            handleChange={handleChange}
            setState={setState}
            setCity={setCity}
            setCityDisabled={setCityDisabled}
            ibgeStates={ibgeStates}
            ibgeCities={ibgeCities}
            cityDisabled={cityDisabled}
            state={state}
            city={city}
            email={email}
            name={name}
            apiData={apiData}
            setName={setName}
            setFieldValue={setFieldValue}
          />
        )}
      </Formik>
      <FlashMessage position="bottom" />
    </KeyboardAvoidingView>
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
  errorText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 12,
    color: "red",
  },
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UpdateUser;
