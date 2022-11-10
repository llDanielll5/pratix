import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { RecoilRoot } from "recoil";
import Constants from "expo-constants";

import React from "react";
import Routes from "./app/navigation";
import { useLocalFonts } from "./app/hooks/useLocalFonts";
import { StripeProvider } from "@stripe/stripe-react-native";

const App = () => {
  const { appIsReady, onLayout } = useLocalFonts();
  const paperTheme = { ...DefaultTheme };

  const publishableKey =
    "pk_test_51M0F3JJa035AVNUnRheBKqci12Ke9ON4LEZfN0LE8h5E0CDTmbMqP4ZrcUnzWWu5N4iO4BWTQtBY9cMTI7NBXhUi00It8JzIRO";
  const secretKey =
    "sk_test_51M0F3JJa035AVNUnWQfeLNdqxkSimo7r3ov1A8Vy14JifeZCAsKakFAHXeXw0jn15y5T9w8IsY50Ly9Un7wNM6i900CqZuuiEF";

  if (!appIsReady) return null;

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <StripeProvider publishableKey={publishableKey}>
        <RecoilRoot>
          <PaperProvider theme={paperTheme}>
            <StatusBar style="auto" />
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <Routes />
          </PaperProvider>
        </RecoilRoot>
      </StripeProvider>
    </View>
  );
};

export default App;
