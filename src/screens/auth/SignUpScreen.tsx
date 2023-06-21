import React from "react";
import { StyleSheet, View } from "react-native";
import CustomInput from "../../components/CustomInput";
import SimpleButton from "../../components/SimpleButton";
import { useSignUp } from "../../hooks/auth/useSignUp";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { fontStyles } from "../../theme/fonts";

const SignUpScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;

  // const navigate = (name: keyof typeof authScreens) =>
  //   navigation.navigate(authScreens[name]);

  const { values, setValue, errors, touched, onSubmit, state } = useSignUp({});

  return (
    <View style={sxContainer}>
      <View style={sxContentContainer}>
        <View style={sxBodyContent}>
          <CustomInput
            label="Nombre"
            value={values.nombre}
            onChangeText={(txt) => setValue("nombre", txt)}
            errorText={errors.nombre && errors.nombre}
            error={touched.nombre && Boolean(errors.nombre)}
            marginVertical={10}
            disabled={state === "submit"}
          />
          <CustomInput
            label="Email"
            value={values.email}
            onChangeText={(txt) => setValue("email", txt)}
            keyboardType="email-address"
            autoCapitalize="none"
            errorText={errors.email && errors.email}
            error={touched.email && Boolean(errors.email)}
            marginVertical={10}
            disabled={state === "submit"}
          />
          <CustomInput
            label="Contraseña"
            value={values.pass}
            onChangeText={(txt) => setValue("pass", txt)}
            secureTextEntry
            autoCapitalize="none"
            errorText={errors.pass && errors.pass}
            error={touched.pass && Boolean(errors.pass)}
            marginVertical={10}
            disabled={state === "submit"}
          />
          <SimpleButton
            text="Registrarse"
            onPress={onSubmit}
            variant="outlined"
            disabled={state === "submit"}
            isLoading={state === "submit"}
            hideIcon
          />
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const { sxContainer, sxContentContainer, sxText, sxBodyContent } =
  StyleSheet.create({
    sxContainer: {
      flex: 1,
      backgroundColor: "transparent",
      paddingTop: "4%",
    },
    sxContentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: "20%",
      justifyContent: "space-around",
    },
    sxText: {
      fontSize: 40,
      marginVertical: "20%",
      color: "#fff",
      ...fontStyles.poppinsSemiBold,
    },
    sxBodyContent: { flex: 1, justifyContent: "center" },
  });
