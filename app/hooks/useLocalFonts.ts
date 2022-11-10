import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export const useLocalFonts = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_100Thin,
          Poppins_100Thin_Italic,
          Poppins_200ExtraLight,
          Poppins_200ExtraLight_Italic,
          Poppins_300Light,
          Poppins_300Light_Italic,
          Poppins_400Regular,
          Poppins_400Regular_Italic,
          Poppins_500Medium,
          Poppins_500Medium_Italic,
          Poppins_600SemiBold,
          Poppins_600SemiBold_Italic,
          Poppins_700Bold,
          Poppins_700Bold_Italic,
          Poppins_800ExtraBold,
          Poppins_800ExtraBold_Italic,
          Poppins_900Black,
          Poppins_900Black_Italic,
          Inter_100Thin,
          Inter_200ExtraLight,
          Inter_300Light,
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Inter_800ExtraBold,
          Inter_900Black,
        });
      } catch (error) {
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) SplashScreen.hideAsync();
  }, [appIsReady]);

  return { onLayout, appIsReady };
};
