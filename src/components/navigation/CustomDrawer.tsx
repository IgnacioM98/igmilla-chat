import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logoutUser } from "../../redux/features/auth/authActions";
import { authSelector } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fontStyles } from "../../theme/fonts";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation, ...other } = props;
  const { top, bottom } = useSafeAreaInsets();

  const { user } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const endSession = () => {
    dispatch(logoutUser());
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={sxDrawerContainer(top)}
    >
      <View style={sxIconContainer}>
        <Image
          source={require("../../../assets/icons8-chat-room-100.png")}
          style={sxIcon}
        />
      </View>
      <Text style={sxUserTitle}>{`Bienvenido(a):\n${user?.nombre}`}</Text>
      <DrawerItemList {...props} />
      <View style={sxBottomLabelContainer(bottom)}>
        <DrawerItem
          label="Cerrar Sesión"
          onPress={endSession}
          labelStyle={sxLabelBottom}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const { sxIconContainer, sxIcon, sxLabelBottom, sxUserTitle } =
  StyleSheet.create({
    sxIconContainer: { width: "100%", alignItems: "center" },
    sxIcon: { height: 70, resizeMode: "contain" },
    sxLabelBottom: {
      color: "#fff",
      fontSize: 17,
      ...fontStyles.poppinsMedium,
    },
    sxUserTitle: {
      color: "#fff",
      fontSize: 17,
      ...fontStyles.poppinsBold,
      marginLeft: 20,
      marginVertical: 20,
    },
  });

const { sxDrawerContainer, sxBottomLabelContainer } = {
  sxDrawerContainer: (top: number): ViewStyle => ({
    paddingTop: top,
    flexGrow: 1,
  }),
  sxBottomLabelContainer: (bottom: number): ViewStyle => ({
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: bottom,
  }),
};
