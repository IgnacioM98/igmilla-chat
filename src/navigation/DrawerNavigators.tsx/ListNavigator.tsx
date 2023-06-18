import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import MenuIcon from "../../components/navigation/MenuIcon";
import { drawerScreens } from "../../constants/screenNames";
import MyChatsScreen from "../../screens/auth/MyChatsScreen";
import { colors } from "../../theme/colors";
import HomeScreen from "../../screens/auth/HomeScreen";

interface RootStackParamList {
  [key: string]: undefined; // Screen names
}

export type StackComponentProps = NativeStackScreenProps<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const screnOps = {
  headerTitle: "",
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: colors.BLACK_PURPLE },
};

export function ListStack() {
  return (
    <Stack.Navigator
      screenOptions={screnOps}
      initialRouteName={drawerScreens.HomeScreen}
    >
      <Stack.Screen
        options={{
          headerLeft: () => <MenuIcon />,
        }}
        name={drawerScreens.HomeScreen}
        component={HomeScreen as any}
      />
    </Stack.Navigator>
  );
}
