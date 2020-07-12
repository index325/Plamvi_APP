import * as yup from "yup";
import { Formik } from "formik";

import React, { Component, useState, useEffect, useContext } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import FormTextInput from "../components/FormTextInput";
import Button from "../components/Button";
// import imageLogo from "../assets/imagens/logo.png";
import colors from "../config/colors";
import constants from "../config/constants";
import FlashMessage from "react-native-flash-message";
import { View } from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";
import AuthContext from "../contexts/Auth";
import { useNavigation, useRoute } from "@react-navigation/native";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation();
  const context = useContext(AuthContext);

  // async function handleLoginPress() {
  //   await context.signIn(email, password);
  // }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={constants.IS_IOS ? "padding" : undefined}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          await context.signIn(values.email, values.password);
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
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View
            style={styles.form}
            animation="zoomIn"
            delay={200}
            useNativeDriver
          >
            <FormTextInput
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              placeholder="E-mail"
              autoCorrect={false}
              fullwidth
              keyboardType="email-address"
              returnKeyType="next"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <FormTextInput
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              placeholder="Password"
              secureTextEntry={true}
              returnKeyType="done"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>
                {errors.password}
              </Text>
            )}
            <View style={styles.nozIndex}>
              <Button
                title="Login"
                label="Login"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>

            <View style={styles.joinUsBlock}>
              <Button
                title="Cadastre-se"
                label="Cadastre-se"
                onPress={() => navigation.navigate("cadastro")}
              />
            </View>

            {/* <FlashMessage position="bottom" /> */}
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 5,
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
    zIndex: 0,
  },
  nozIndex: {
    zIndex: 0,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  errorText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 12,
    color: "red",
  },
});

export default Login;
