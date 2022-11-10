import { Alert } from "react-native";
import Purchases from "react-native-purchases";
import { ENTITLEMENT_ID } from "../constants/revCat";

export const getPackages = async (setPackages: any) => {
  try {
    const offerings = await Purchases.getOfferings();
    if (
      offerings.current !== null &&
      offerings.current.availablePackages.length !== 0
    ) {
      const packages = offerings.current.availablePackages;
      setPackages(packages);
    }
  } catch (e: any) {
    Alert.alert(
      "Error to getPackages",
      e.code + " underlying: " + e.underlyingErrorMessage
    );
  }
};

export const hasPremium = async () => {
  try {
    const purchaserInfo = await Purchases.getCustomerInfo();
    if (purchaserInfo.entitlements.active[ENTITLEMENT_ID]) {
      return true;
    } else {
      return false;
    }
  } catch (e: any) {
    Alert.alert(
      "Error to hasPremium",
      e.code + " underlying: " + e.underlyingErrorMessage
    );
  }
};

export const purchaserUpdateListener = async () => {
  Purchases.addCustomerInfoUpdateListener((purchaserInfo) => {
    if (purchaserInfo.entitlements.active[ENTITLEMENT_ID]) {
      console.log("has premium");
    } else {
      console.log("not has premium");
    }
  });
};
