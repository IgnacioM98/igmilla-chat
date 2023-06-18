import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { authScreens, drawerScreens } from "../../constants/screenNames";
import CustomInput from "../../components/CustomInput";
import SimpleButton from "../../components/SimpleButton";
import { useLogin } from "../../hooks/auth/useLogin";
import { StackComponentProps } from "../../navigation/AuthNavigator";
import { fontStyles } from "../../theme/fonts";
import { ScreenLayout } from "../../layout/ScreenLayout";

const HomeScreen = (props: StackComponentProps) => {
  const { navigation, ...others } = props;

  const navigate = (name: keyof typeof drawerScreens) =>
    navigation.navigate(drawerScreens[name]);

  const goChat = () => navigate("ChatScreen");

  return (
    <ScreenLayout title="Chatea Ahora!">
      <View style={sxContainer}>
        <SimpleButton text="Ir al Chat" onPress={goChat} />
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;

const { sxContainer } = StyleSheet.create({
  sxContainer: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
});
