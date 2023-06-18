import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export interface Props {
  reditect?: VoidFunction;
}

export const useManageChat = ({ reditect }: Props) => {
  const [shouldRedirect, setRedirect] = useState(false);
  const selectChat = (chat: any) => {
    setRedirect(true);
  };

  useEffect(() => {
    if (shouldRedirect && reditect) {
      setRedirect(false);
      reditect();
    }
  }, [shouldRedirect]);

  return { selectChat };
};
