import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet, View, ViewStyle, Image, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch } from "../../redux/store/store";
import { fontStyles } from "../../theme/fonts";
import { setAuthentication } from "../../redux/features/auth/authActions";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation, ...other } = props;
  const { top, bottom } = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const endSession = () => {
    dispatch(setAuthentication("Unauthenticated"));
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
      <Text style={sxUserTitle}>{`Bienvenido(a):\nUsuario`}</Text>
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
