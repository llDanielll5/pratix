import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import colors from "../../constants/colors";

import styles from "./styles";

type PropsInput = React.ComponentProps<typeof TextInput>;

const Input = (props: PropsInput) => {
  const { mode, activeOutlineColor, outlineColor } = props;

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        {...props}
        mode={mode ?? "outlined"}
        outlineColor={outlineColor ?? colors.black}
        activeOutlineColor={activeOutlineColor ?? colors.black}
        style={[styles.inputStyle, props.style]}
      />
    </View>
  );
};

export default Input;
