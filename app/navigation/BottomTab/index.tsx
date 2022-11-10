import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import HomePage from "../../screens/HomePage";
import Nearby from "../../screens/Nearby";
import Panel from "../../screens/Panel";
import Profile from "../../screens/Profile";

const BottomTab = () => {
  const Tab = createMaterialTopTabNavigator();
  const Icon = (iconName: string, focused: boolean) => (
    <IconButton
      icon={iconName}
      color={focused ? "black" : "#ccc"}
      size={35}
      style={{ margin: 0 }}
    />
  );
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = "";
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Nearby":
              iconName = "map-marker";
              break;
            case "Panel":
              iconName = "sticker-plus";
              break;
            case "Profile":
              iconName = "account-box";
              break;
          }
          return Icon(iconName, focused);
        },
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarPressColor: "white",
        tabBarIconStyle: { height: "100%", width: "25%" },
        tabBarIndicatorStyle: { backgroundColor: "transparent" },
        tabBarIndicatorContainerStyle: styles.lineTop,
        swipeEnabled: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Nearby" component={Nearby} />
      <Tab.Screen name="Panel" component={Panel} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    height: 70,
    width: "100%",
  },
  iconFocused: {
    backgroundColor: "#ccc",
    borderRadius: 50,
    padding: 10,
  },
  lineTop: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default BottomTab;
