import { Feather } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useControlledRedirect } from "../hooks/useControlledRedirect";
// import Camion from "../icons/Camion";
// import Dashboard from "../icons/Dashboard";
// import Logo from "../icons/Logo";
import { footerTypes, screenTypes } from "../models/layout-models";
// import { helperNavScreen } from "../redux/features/navhelp/navhelpTypes";
import { colors } from "../theme/colors";
import { fontStyles } from "../theme/fonts";

const FOOTER_HEIGHT = 100;

type Props = {
  children: ReactNode;
  showVerticalScrollIndicator?: boolean;
  style?: StyleProp<ViewStyle>;
  showFooter?: boolean;
  footerType?: footerTypes;
  title?: string;
};
type Main = {
  screenType?: screenTypes;
};

export const ScreenLayout: FC<Props & Main> = (props) => {
  const {
    showFooter = false,
    footerType,
    screenType = screenTypes.view,
  } = props;
  const headerHeight = useHeaderHeight();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({
        android: top,
        ios: headerHeight,
      })}
      style={stylesFunc.container(showFooter ? 0 : bottom)}
      behavior={Platform.select({ android: undefined, ios: "padding" })}
      enabled
    >
      {/* <StatusBar style={drawerIsOpen ? "dark" : "light"} /> */}
      {/* TODO: This View element can be the 'oval' section of header
      <View style={{ height: 100, backgroundColor: "pink" }} /> */}
      {screenType === screenTypes.view ? (
        <LayoutView
          {...props}
          BottomElement={<Footer bottom={bottom} footerType={footerType} />}
        />
      ) : (
        <LayoutScroll
          {...props}
          BottomElement={<Footer bottom={bottom} footerType={footerType} />}
        />
      )}
      {showFooter && footerType === footerTypes.fixed ? (
        <Footer bottom={bottom} footerType={footerType} />
      ) : null}
    </KeyboardAvoidingView>
  );
};

const LayoutView: FC<Props & { BottomElement: ReactNode | null }> = ({
  children,
  BottomElement,
  showFooter,
  footerType,
  title,
}) => {
  return (
    <View
      style={{
        flex: 1,
        marginBottom:
          footerType === footerTypes.fixed && showFooter
            ? FOOTER_HEIGHT
            : undefined,
      }}
    >
      {typeof title !== "undefined" && (
        <Text style={styles.title}>{title}</Text>
      )}
      {children}
      {showFooter && footerType === footerTypes.relative ? BottomElement : null}
    </View>
  );
};

const LayoutScroll: FC<Props & { BottomElement: ReactNode | null }> = ({
  children,
  showVerticalScrollIndicator = false,
  BottomElement,
  showFooter,
  footerType,
  title,
}) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={showVerticalScrollIndicator}
      overScrollMode="auto"
      nestedScrollEnabled
      style={{
        flex: 1,
        marginBottom:
          footerType === footerTypes.fixed && showFooter
            ? FOOTER_HEIGHT
            : undefined,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      {typeof title !== "undefined" && (
        <Text style={styles.title}>{title}</Text>
      )}
      {children}
      {showFooter && footerType === footerTypes.relative ? BottomElement : null}
    </ScrollView>
  );
};

type FooterProps = {
  bottom: number;
  footerType?: footerTypes;
};
const Footer: FC<FooterProps> = ({ bottom, footerType }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // const {
  //   onPressInicio,
  //   onPressBuscar,
  //   onPressEncargo,
  //   onPressMenu,
  //   isHomeStack,
  //   currentScreen,
  //   authState,
  // } = useControlledRedirect({});

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible) return null; // Prevents footer from appearing on top of keyboard when 'footerType.fixed'
  return (
    <View
      style={stylesFunc.footer(
        bottom,
        footerType === footerTypes.fixed ? true : false
      )}
    >
      {/* <View style={styles.footerContentContainer}>
        <TouchableOpacity style={styles.footerItem} onPress={onPressInicio}>
          <Dashboard height={40} width={35} style={{ bottom: 10 }} />
          <Text style={[styles.footerText, stylesFunc.textDecor(false)]}>
            Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={onPressBuscar}
          disabled={authState !== "Authenticated"}
        >
          <Logo workHeight={199} style={{ top: 13, left: 20 }} />
          <Text
            style={[
              styles.footerText,
              stylesFunc.textDecor(
                isHomeStack && currentScreen === helperNavScreen.buscar
              ),
            ]}
          >
            Buscar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={onPressEncargo}
          disabled={authState !== "Authenticated"}
        >
          <Camion height={40} width={40} style={{ bottom: 10 }} />
          <Text
            style={[
              styles.footerText,
              stylesFunc.textDecor(
                isHomeStack && currentScreen === helperNavScreen.encargos
              ),
            ]}
          >
            Encargos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={onPressMenu}>
          <Feather name="menu" size={28} color="#fff" style={{ bottom: 8 }} />
          <Text style={styles.footerText}>Menú</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  footerContentContainer: {
    flex: 1,
    backgroundColor: colors.PURPLE,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    color: colors.PURPLE,
    fontSize: 19,
    ...fontStyles.poppinsSemiBold,
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    position: "absolute",
    bottom: 4,
    textAlign: "center",
    ...fontStyles.poppinsRegular,
  },
  footerItem: { flex: 0.2, justifyContent: "center", alignItems: "center" },
});

const stylesFunc = {
  container: (bottom: number): ViewStyle => ({
    flex: 1,
    paddingBottom: bottom,
    paddingTop: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: Platform.select({ ios: 5, android: 5 }),
  }),
  footer: (bottom: number, absolute?: boolean): ViewStyle => ({
    minHeight: FOOTER_HEIGHT,
    // backgroundColor: "rgba(228, 53, 143, 0.8)",
    paddingBottom: bottom || 20,
    alignSelf: absolute ? "flex-end" : undefined,
    bottom: 0,
    position: absolute ? "absolute" : undefined,
    width: absolute ? "100%" : undefined,
  }),
  textDecor: (decorate: boolean): TextStyle => ({
    textDecorationLine: decorate ? "underline" : "none",
  }),
};
