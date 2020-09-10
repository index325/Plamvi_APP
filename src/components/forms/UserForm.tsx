import React, {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import colors from "../../config/colors";
import { StyleSheet, View, Text } from "react-native";
import Button from "../Button";
import RNPickerSelect from "react-native-picker-select";
import FormTextInput from "../FormTextInput";
import { FormikErrors, FormikTouched } from "formik";

interface Props {
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  errors: FormikErrors<{
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
    state: string;
    city: string;
  }>;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
  touched: FormikTouched<{
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
    state: string;
    city: string;
  }>;
  isValid: boolean;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  setErrors: (
    errors: FormikErrors<{
      email: string;
      password: string;
      name: string;
      passwordConfirm: string;
      state: string;
      city: string;
    }>
  ) => void;
  setCityDisabled: Dispatch<SetStateAction<boolean>>;
  cityDisabled: boolean;
  setState: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  ibgeStates: any;
  ibgeCities: any;
  values: {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
    state: string;
    city: string;
  };
  initialValues: {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
    state: string;
    city: string;
  };
  apiData?: {
    email: string;
    password: string;
    name: string;
    state: string;
    city: string;
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const UserForm: React.FC<Props> = ({
  values,
  handleChange,
  errors,
  setFieldTouched,
  touched,
  isValid,
  handleSubmit,
  setErrors,
  setCity,
  setCityDisabled,
  cityDisabled,
  setState,
  ibgeStates,
  ibgeCities,
  apiData,
  setFieldValue,
}) => {
  const [cityCharged, setCityCharged] = useState(false);
  if (apiData) {
    useEffect(() => {
      setFieldValue("email", apiData.email);
      setFieldValue("name", apiData.name);
      setFieldValue("state", apiData.state);
      setFieldValue("city", apiData.city);
    }, [apiData]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.formFieldContainer}>
        <FormTextInput
          value={values.email}
          onChangeText={(text: string) => setFieldValue("email", text)}
          onBlur={() => setFieldTouched("email")}
          placeholder="E-mail"
          autoCorrect={false}
          keyboardType="email-address"
        />
        {touched.email && errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
        <FormTextInput
          value={values.name}
          onChangeText={(text: string) => setFieldValue("name", text)}
          onBlur={() => setFieldTouched("name")}
          placeholder="Nome"
          autoCorrect={true}
          autoCapitalize="words"
        />
        {touched.name && errors.name && (
          <Text style={styles.errorText}>{errors.name}</Text>
        )}
        <View style={pickerSelectStyles.inputAndroid}>
          <RNPickerSelect
            value={values.state}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            onValueChange={(state) => {
              if (values.state !== null) {
                delete errors.state;
                setCityDisabled(false);
                setErrors({ city: "Este campo é obrigatório" });
              } else {
                setCityDisabled(true);
                setErrors({ state: "Este campo é obrigatório" });
              }
              setFieldValue("state", state);
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
        {errors.state ? (
          <Text style={styles.errorText}>{errors.state}</Text>
        ) : (
          <Text />
        )}
        <View style={pickerSelectStyles.inputAndroid}>
          <RNPickerSelect
            value={values.city}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            // disabled={cityDisabled}
            onValueChange={(city) => {
              if (cityCharged) {
                if (values.city !== null) {
                  delete errors.city;
                } else {
                  setErrors({ city: "Este campo é obrigatório" });
                }
                setFieldValue("city", city);
                setCity(city)
              }
              setCityCharged(true);
            }}
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
        {errors.city ? (
          <Text style={styles.errorText}>{errors.city}</Text>
        ) : (
          <Text />
        )}
        <FormTextInput
          onChangeText={handleChange("password")}
          onBlur={() => setFieldTouched("password")}
          placeholder="Senha"
          secureTextEntry={true}
        />
        {touched.password && errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <FormTextInput
          onChangeText={handleChange("passwordConfirm")}
          onBlur={() => setFieldTouched("passwordConfirm")}
          placeholder="Confirmação de Senha"
          secureTextEntry={true}
        />
        {touched.passwordConfirm && errors.passwordConfirm && (
          <Text style={styles.errorText}>{errors.passwordConfirm}</Text>
        )}
      </View>
      <Button
        title="Cadastrar"
        label="Cadastrar"
        onPress={handleSubmit}
        disabled={!isValid}
      />
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

export default UserForm;
