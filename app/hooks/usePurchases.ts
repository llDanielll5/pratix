import Purchases from "react-native-purchases";
import { useEffect } from "react";
import { Platform } from "react-native";
import { REVCAT_GOOGLE_KEY } from "../constants/revCat";

export const usePurchases = () => {
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: REVCAT_GOOGLE_KEY });
    }
  }, []);
};
