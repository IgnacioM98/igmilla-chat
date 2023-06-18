import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";

interface MenuIconProps {
  color?: string;
}
const MenuIcon: FC<MenuIconProps> = ({ color = "#fff" }) => {
  const navigation = useNavigation();
  const onPress = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name="menu-open" size={30} color={color} />
    </TouchableOpacity>
  );
};

export default MenuIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK_PURPLE,
  },
});
