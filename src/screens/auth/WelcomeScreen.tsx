import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import SimpleButton from "../../components/SimpleButton";
import { authScreens } from "../../constants/screenNames";
// import Logotipo from "../../icons/Logotipo";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { colors } from "../../theme/colors";
import { fontStyles } from "../../theme/fonts";

const WelcomeScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;

  const navigate = (name: keyof typeof authScreens) =>
    navigation.navigate(authScreens[name]);

  const onRedirect = () => navigate("SignInScreen");
  const onRegister = () => navigate("SignUpScreen");

  const { top } = useSafeAreaInsets();

  return (
    <View style={sxContainer}>
      <View style={{ marginTop: top }}>
        {/* <Logotipo
          height={200}
          marginVertical={-20}
          width={"60%"}
          marginLeft={-25}
        /> */}
      </View>
      <View style={sxContentContainer}>
        <Text style={sxText}>
          <Text style={{ color: colors.PINK }}>A</Text> A
          <Text style={{ color: colors.PINK }}>A</Text>.
        </Text>
        <View>
          {/* <SimpleButton text="Ingreso de Usuario" onPress={onRedirect} />
          <SimpleButton
            text="Regístrate aquí"
            onPress={onRegister}
            variant="outlined"
          /> */}
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const { sxContainer, sxContentContainer, sxText } = StyleSheet.create({
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
    color: "#fff",
    ...fontStyles.poppinsSemiBold,
  },
});
