import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
// import styles from '../estilo/Padrao';
import FormTextInput from "../components/FormTextInput";
import UserForm from "../components/forms/UserForm";
import colors from "../config/colors";
import axios from "axios";
import constants from "../config/constants";
import FlashMessage, { showMessage } from "react-native-flash-message";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import Button from "../components/Button";
import { Formik } from "formik";
import RNPickerSelect from "react-native-picker-select";

interface IBGEUFResponse {
  nome: string;
  sigla: string;
  id: number;
}

interface IBGECityResponse {
  nome: string;
}

const Cadastro: React.FC = () => {
  // const [name, setName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("0");
  // const [password, setPassword] = useState<string>("");
  // const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [ibgeCities, setIbgeCities] = useState<string[] | any>([]);
  const [ibgeStates, setIbgeStates] = useState<string[] | any>([]);
  const [cityDisabled, setCityDisabled] = useState<boolean>(true);

  const navigation = useNavigation();

  // function handleEmailChange(email: string) {
  //   setEmail(email);
  // }

  // function handlePasswordChange(password: string) {
  //   setPassword(password);
  // }

  // function handlePasswordConfirmChange(passwordConfirm: string) {
  //   setPasswordConfirm(passwordConfirm);
  // }

  // function handleNameChange(name: string) {
  //   setName(name);
  // }

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

  async function handleRegisterPress(
    password: string,
    state: string,
    passwordConfirm: string,
    city: string,
    name: string,
    email: string
  ) {
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
    <KeyboardAvoidingView
      // style={styles.container}
      behavior={constants.IS_IOS ? "padding" : undefined}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          passwordConfirm: "",
          state: "",
          city: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          if (state === null || state === "0") {
            setErrors({ state: "Este campo é obrigatório" });
          }
          if (city === null || city === "0") {
            setErrors({ city: "Este campo é obrigatório" });
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
          axios({
            method: "post",
            url: constants.API_USER_URL,
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            data: {
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
                  "Você se cadastrou com sucesso. Agora, faça o login!",
                type: "success",
                position: "bottom",
                floating: true,
              });
              navigation.navigate("loginScreen");
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
          initialValues,
          values,
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
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            setErrors={setErrors}
            isValid={isValid}
            touched={touched}
            setFieldTouched={setFieldTouched}
            errors={errors}
            handleChange={handleChange}
            setState={setState}
            setCityDisabled={setCityDisabled}
            ibgeStates={ibgeStates}
            ibgeCities={ibgeCities}
            setCity={setCity}
            cityDisabled={cityDisabled}
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
