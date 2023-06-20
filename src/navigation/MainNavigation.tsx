import { createDrawerNavigator } from "@react-navigation/drawer";
import { drawerScreens } from "../constants/screenNames";
import { colors } from "../theme/colors";
import { fontStyles } from "../theme/fonts";
import { HomeStack } from "./DrawerNavigators.tsx/HomeNavigator";
import { ListStack } from "./DrawerNavigators.tsx/ListNavigator";

const Drawer = createDrawerNavigator();

export function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "slide",
        headerShown: false,
        drawerStyle: { backgroundColor: colors.PURPLE },
        drawerActiveBackgroundColor: "transparent",
        drawerLabelStyle: {
          color: "#fff",
          fontSize: 17,
          ...fontStyles.poppinsMedium,
        },
      }}
    >
      <Drawer.Screen
        options={{
          drawerLabel: "Inicio",
        }}
        name={drawerScreens.HomeNavigator}
        component={HomeStack}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Chatear",
        }}
        name={drawerScreens.ListNavigator}
        component={ListStack}
      />
    </Drawer.Navigator>
  );
}
