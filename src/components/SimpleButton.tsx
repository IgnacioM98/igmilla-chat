import { AntDesign } from "@expo/vector-icons";
import React, { FC } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import { fontStyles } from "../theme/fonts";

interface ButtonProps {
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  iconColor?: string;
  text?: string;
  onPress: VoidFunction;
  variant?: "outlined" | "contained";
  hideIcon?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}
const SimpleButton: FC<ButtonProps> = (props) => {
  const {
    containerStyles,
    textStyles,
    iconColor = "#fff",
    text = "",
    onPress,
    variant = "contained",
    hideIcon = false,
    disabled = false,
    isLoading = false,
    ...others
  } = props;
  return (
    <TouchableOpacity
      style={[
        variant === "contained" ? styles.container : styles.containerB,
        containerStyles,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {hideIcon || isLoading ? null : (
          <AntDesign name="arrowright" size={24} color={iconColor} />
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator
          color={variant === "contained" ? "#fff" : colors.BLACK_PURPLE}
        />
      ) : (
        <Text style={[styles.text, textStyles]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK_PURPLE,
    width: "100%",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 35,
  },
  containerB: {
    borderColor: colors.BLACK_PURPLE,
    borderWidth: 2,
    width: "100%",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 35,
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    width: 25,
    marginVertical: 18,
    alignContent: "center",
  },
  text: {
    fontSize: 14,
    color: "#fff",
    // backgroundColor: "orange",
    width: "100%",
    textAlign: "center",
    ...fontStyles.poppinsMedium,
  },
});
