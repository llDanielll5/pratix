import React from "react";
import Purchases, { PurchasesPackage } from "react-native-purchases";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { ENTITLEMENT_ID } from "../../constants/revCat";
import colors from "../../constants/colors";
import { updateUserInfos } from "../../firebase/functions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AuthStatus from "../../atom/AuthStatus";
import { UserType } from "../../../enum";
import UserData from "../../atom/UserData";

interface PackagesProps {
  purchasePackage: PurchasesPackage;
  setIsPurchasing: (value: boolean) => void;
}

const PackageItem: React.FC<PackagesProps> = (props) => {
  const { purchasePackage, setIsPurchasing } = props;
  const { identifier, product, packageType } = purchasePackage;
  const { currencyCode, description, priceString, title } = product;
  const setAuthStatus = useSetRecoilState(AuthStatus);
  const userData = useRecoilValue(UserData);

  const onSelectPackage = async () => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(purchasePackage);
      if (
        typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined"
      ) {
        setAuthStatus((prev) => ({ ...prev, userType: UserType.PREMIUM }));
        await updateUserInfos(
          { userType: UserType.PREMIUM },
          userData?.username
        );
        Alert.alert(
          "Congratulations!!",
          "Now you are a premium user of Pratix, enjoy all the benefits of the app!"
        );
      }
    } catch (error: any) {
      if (error.userCancelled) {
        Alert.alert("Purchase cancelled", "You cancelled the purchase");
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={onSelectPackage}
      activeOpacity={0.5}
      style={styles.container}
    >
      <Text style={styles.texts}>{title}</Text>
      <Text style={styles.texts}>{`${priceString}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  texts: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});

export default PackageItem;
