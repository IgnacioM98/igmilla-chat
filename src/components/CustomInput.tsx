import { Feather, Entypo } from "@expo/vector-icons";
import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import { fontStyles } from "../theme/fonts";

interface CustomProps {
  label: string;
  startIcon?: ReactNode;
  error?: boolean;
  errorText?: string;
  marginVertical?: number;
  isPicker?: boolean;
  onOpenPicker?: VoidFunction;
  disabled?: boolean;
  isDate?: boolean;
  hidePassEye?: boolean;
}
const CustomInput: FC<CustomProps & TextInputProps> = ({
  value,
  label,
  startIcon,
  error = false,
  errorText = "",
  marginVertical = 5,
  isPicker = false,
  onOpenPicker,
  disabled = false,
  isDate = false,
  secureTextEntry,
  hidePassEye = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedFocused, setAnimatedFocused] = useState<Animated.Value>();
  const [hidePass, setHidePass] = useState(true);
  const changeHidePass = () => setHidePass(!hidePass);

  useEffect(() => {
    setAnimatedFocused(new Animated.Value(value === "" ? 0 : 1));
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (!animatedFocused) return;
    Animated.timing(animatedFocused, {
      toValue: isFocused || value !== "" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedFocused, isFocused]);

  useEffect(() => {
    if (isDate && value) {
      if (!isFocused) setIsFocused(true);
    }
  }, [value, isDate]);
  useEffect(() => {
    if (isDate) return;
    if (value && isPicker) {
      if (!isFocused) setIsFocused(true);
    } else if (isFocused && value === "" && isPicker) {
      setIsFocused(false);
    }
  }, [value, isPicker]);

  return (
    <View style={{ marginVertical: marginVertical }}>
      <InputLayout
        style={{
          ...styles.container,
          paddingLeft: startIcon ? 40 : 10,
        }}
        isPicker={isPicker}
        onOpenPicker={onOpenPicker}
        disabled={disabled}
      >
        {startIcon && <View style={styles.startIcon}>{startIcon}</View>}
        <Animated.Text
          style={{
            position: "absolute",
            left: startIcon ? 40 : 10,
            top: animatedFocused?.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 4],
            }),
            fontSize: animatedFocused?.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            // color: animatedFocused?.interpolate({
            //   inputRange: [0, 1],
            //   outputRange: [colors.MAIN_BLUE, colors.GREEN_BLUE],
            // }),
            color: colors.BLACK_PURPLE,
            ...fontStyles.poppinsMedium,
          }}
        >
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          secureTextEntry={hidePass ? secureTextEntry : false}
          style={styles.input}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          focusable={!isPicker}
          editable={disabled ? false : true}
          blurOnSubmit
        />
      </InputLayout>
      {error && errorText && (
        <>
          <View style={styles.endIcon}>
            <Feather name="x-circle" size={22} color={colors.BLACK_PURPLE} />
          </View>
          <Text style={styles.errorText}>{errorText}</Text>
        </>
      )}
      {isPicker && !error && !isDate && (
        <>
          <View style={styles.endIcon}>
            <Entypo name="chevron-down" size={24} color="gray" />
          </View>
        </>
      )}
      {!isPicker && !error && !isDate && secureTextEntry && !hidePassEye && (
        <>
          <View style={styles.endIcon}>
            <TouchableOpacity onPress={changeHidePass}>
              <Feather name="eye" size={24} color={colors.BLACK_PURPLE} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

type InputLayoutProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isPicker?: boolean;
  onOpenPicker?: VoidFunction;
  disabled?: boolean;
};

const InputLayout: FC<InputLayoutProps> = (props) => {
  const { isPicker = false } = props;

  if (isPicker) return <TouchableView {...props} />;
  return <NormalView {...props} />;
};

const NormalView: FC<InputLayoutProps> = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

const TouchableView: FC<InputLayoutProps> = ({
  children,
  onOpenPicker,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity style={style} disabled={disabled} onPress={onOpenPicker}>
      {children}
      <View style={styles.fillView} />
    </TouchableOpacity>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    backgroundColor: "#fff",
    paddingBottom: 12,
    borderRadius: 15,
  },
  startIcon: {
    position: "absolute",
    height: "100%",
    width: 30,
    marginTop: 14,
    paddingLeft: 10,
  },
  input: {
    height: 26,
    fontSize: 16,
    marginBottom: Platform.select({ ios: undefined, android: -1 }),
    marginTop: Platform.select({ ios: undefined, android: 1 }),
    marginRight: 35,
    color: colors.BLACK_PURPLE,
    ...fontStyles.poppinsMedium,
  },
  endIcon: {
    position: "absolute",
    height: "100%",
    marginTop: 16,
    right: 15,
  },
  errorText: {
    color: "red",
    ...fontStyles.poppinsMedium,
    fontSize: 11,
    marginVertical: 2,
    textAlign: "right",
    marginRight: 15,
  },
  fillView: {
    position: "absolute",
    backgroundColor: "transparent",
    width: "100%",
    right: 0,
    height: 55,
  },
});
