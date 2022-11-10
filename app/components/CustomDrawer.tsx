import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 100,
          padding: 20,
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <View style={{ width: "50%", height: "100%" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../logo.jpg")}
          />
        </View>
        <View
          style={{
            width: "50%",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD">
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#D9D9D9",
                borderRadius: 50,
              }}
            ></View>
          </TouchableHighlight>
        </View>
      </View>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};
export default CustomDrawer;
