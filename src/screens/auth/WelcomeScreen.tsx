import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { authScreens } from "../../constants/screenNames";
import CustomInput from "../../components/CustomInput";
import SimpleButton from "../../components/SimpleButton";
import { useLogin } from "../../hooks/auth/useLogin";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { fontStyles } from "../../theme/fonts";
import { ScreenLayout } from "../../layout/ScreenLayout";
import { colors } from "../../theme/colors";

const WelcomeScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;

  const navigate = (name: keyof typeof authScreens) =>
    navigation.navigate(authScreens[name]);

  const onRegister = () => navigate("SignUpScreen");
  const onRecover = () => navigate("RecoverScreen");
  const { values, setValue, errors, touched, onSubmit, state } = useLogin({});

  return (
    <ScreenLayout bgColor={colors.PURPLE}>
      <View style={sxContainer}>
        <View style={sxContentContainer}>
          <Text style={sxText}>{`Welcome to My\nBasic Chat App`}</Text>
          <View style={sxBodyContent}>
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
              hidePassEye
            />
            <SimpleButton
              text="Ingresar"
              onPress={onSubmit}
              disabled={state === "submit"}
              isLoading={state === "submit"}
            />
            <SimpleButton
              text="Regístrate aquí"
              onPress={onRegister}
              variant="outlined"
            />
            <Text onPress={onRecover} style={sxTextRecover}>
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default WelcomeScreen;

const {
  sxContainer,
  sxContentContainer,
  sxText,
  sxBodyContent,
  sxTextRecover,
} = StyleSheet.create({
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
    fontSize: 30,
    marginVertical: "20%",
    color: "#fff",
    ...fontStyles.poppinsSemiBold,
  },
  sxBodyContent: { flex: 1, justifyContent: "center" },
  sxTextRecover: {
    color: "#fff",
    ...fontStyles.poppinsMedium,
    alignSelf: "center",
    marginVertical: 10,
  },
});
