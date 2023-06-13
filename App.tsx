import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useAppInit } from "./src/hooks/useAppInit";
import { AuthStack } from "./src/navigation/AuthNavigator";
import store from "./src/redux/store/store";

import "react-native-gesture-handler";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppMain />
      </Provider>
    </SafeAreaProvider>
  );
}

function AppMain() {
  // const { authState } = useAppSelector(authSelector);

  const { appReady } = useAppInit({});
  if (!appReady) return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AuthStack />
      {/* {authState === "Unauthenticated" ? <AuthStack /> : <MainDrawer />} */}
    </NavigationContainer>
  );
}

const { container } = StyleSheet.create({
  container: {
    flex: 1,
  },
});
