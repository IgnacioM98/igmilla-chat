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
import { validateUser } from "../redux/features/auth/authActions";
import { useAppDispatch } from "../redux/store/store";

SplashScreen.preventAutoHideAsync();

export interface Props {}

export const useAppInit = ({}: Props) => {
  const dispatch = useAppDispatch();

  const [credsLoad, setCredLoaded] = useState(false); // should be false
  const [fontLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      const res = await AsyncStorage.getItem("@credentials");
      if (res) {
        const credentials = JSON.parse(res);
        dispatch(validateUser(credentials));
      }
      setCredLoaded(true);
    }
    prepare();
  }, []);

  useEffect(() => {
    const hideSplash = async () => await SplashScreen.hideAsync();
    if (credsLoad && fontLoaded) hideSplash();
  }, [credsLoad, fontLoaded]);

  useEffect(() => {}, [fontLoaded]);

  return { appReady: credsLoad && fontLoaded };
};
