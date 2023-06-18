import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import MenuIcon from "../../components/navigation/MenuIcon";
import { drawerScreens } from "../../constants/screenNames";
import ChatScreen from "../../screens/auth/ChatScreen";
import HomeScreen from "../../screens/auth/HomeScreen";
import { colors } from "../../theme/colors";
import MyChatsScreen from "../../screens/auth/MyChatsScreen";

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

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={screnOps}
      initialRouteName={drawerScreens.HomeScreen}
    >
      <Stack.Screen
        options={{
          headerLeft: () => <MenuIcon />,
        }}
        name={drawerScreens.MyChatsScreen}
        component={MyChatsScreen as any}
      />
      <Stack.Screen
        options={{ headerTitle: "Chat con persona" }}
        name={drawerScreens.ChatScreen}
        component={ChatScreen as any}
      />
    </Stack.Navigator>
  );
}
