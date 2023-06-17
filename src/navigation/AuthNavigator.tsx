import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import { authScreens } from "../constants/screenNames";
import { colors } from "../theme/colors";
import SignUpScreen from "../screens/auth/SignUpScreen";

interface RootStackParamList {
  [key: string]: undefined; // Screen names
}

export type StackComponentProps = NativeStackScreenProps<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.PURPLE },
        headerStyle: { backgroundColor: colors.PURPLE },
        headerTitle: "",
        headerShown: false,
        headerTintColor:'#fff'
      }}
    >
      <Stack.Screen
        name={authScreens.WelcomeScreen}
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name={authScreens.SignUpScreen}
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}
