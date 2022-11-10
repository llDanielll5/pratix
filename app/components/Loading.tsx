import * as React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface LoadingProps {
  isLoading: boolean;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const Loading = (props: LoadingProps) => {
  const { isLoading, color, size, style } = props;
  return (
    <View
      style={[
        {
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <ActivityIndicator
        animating={isLoading}
        color={color ?? "black"}
        size={size ?? 30}
      />
    </View>
  );
};
export default Loading;
