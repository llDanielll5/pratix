import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserNotLogged from "../screens/HomePage/components/UserNotLogged";
import BottomTab from "./BottomTab";
import { defaultOptions } from "../utils/defaultOptions";
import EditProfile from "../screens/Profile/EditProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "../screens/Onboarding";
import { usePersistLogin } from "../hooks/usePersistLogin";
import { useRecoilValue } from "recoil";
import AuthStatus from "../atom/AuthStatus";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const [persistLogin, setPersistLogin] = useState(false);
  const { isAuthenticated } = useRecoilValue(AuthStatus);

  usePersistLogin().then(() => {
    setPersistLogin(true);
  });

  const [isOnboarding, setIsOnboarding] = useState<boolean>(null);

  async function firstAccess() {
    const getFirstAccess = await AsyncStorage.getItem("@first_access");
    if (!getFirstAccess || getFirstAccess === "false") {
      AsyncStorage.setItem("@first_access", "true");
      setIsOnboarding(true);
    } else {
      setIsOnboarding(false);
    }
  }

  useEffect(() => {
    firstAccess();
  }, []);

  if (isOnboarding === null) return null;
  else if (!persistLogin) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions}>
        {isOnboarding && (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
        {!isAuthenticated && (
          <Stack.Screen name="NotLogged" component={UserNotLogged} />
        )}
        <Stack.Screen name="HomeTab" component={BottomTab} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
