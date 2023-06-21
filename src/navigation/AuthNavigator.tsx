import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { authScreens } from "../constants/screenNames";
import SignUpScreen from "../screens/auth/SignUpScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import { colors } from "../theme/colors";
import SendRecoverScreen from "../screens/auth/SendRecoverScreen";

interface RootStackParamList {
  [key: string]: undefined; // Screen names
}

export type StackComponentProps = NativeStackScreenProps<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOps = {
  contentStyle: { backgroundColor: colors.PURPLE },
  headerStyle: { backgroundColor: colors.PURPLE },
  headerTitle: "",
  headerShown: false,
  headerTintColor: "#fff",
};

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={screenOps}>
      <Stack.Screen
        name={authScreens.WelcomeScreen}
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name={authScreens.SignUpScreen}
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name={authScreens.RecoverScreen}
        component={SendRecoverScreen}
      />
    </Stack.Navigator>
  );
}
