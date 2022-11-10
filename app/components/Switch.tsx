import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../constants/colors";

type SwitchProps = {
  onPress?: () => void;
  isSelected?: boolean;
  icon?: string;
  iconColor?: string;
  isNotSubtitle?: boolean;
  iconActive?: boolean;
  backgroundStyle?: string;
};

const Switch = (props: SwitchProps & TouchableOpacityProps) => {
  const { onPress, isSelected, icon, iconActive, backgroundStyle, iconColor } =
    props;

  return (
    <View>
      {isSelected ? (
        <>
          <TouchableOpacity
            {...props}
            onPress={onPress}
            style={[
              styles.buttonActive,
              { backgroundColor: backgroundStyle ?? colors.primary },
              props.style,
            ]}
          >
            <View style={styles.containerIconActive}>
              {iconActive ? (
                <IconButton
                  icon={icon}
                  size={20}
                  color={iconColor ?? colors.black}
                  style={{ margin: 0, top: -4 }}
                />
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            {...props}
            onPress={onPress}
            style={[
              styles.button,
              { backgroundColor: backgroundStyle ?? colors.primary },
              props.style,
            ]}
          >
            <View style={styles.containerIcon}>
              {iconActive ? (
                <IconButton
                  icon={icon}
                  size={20}
                  color={iconColor ?? colors.black}
                  style={{ margin: 0, top: -4 }}
                />
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  containerIcon: {
    backgroundColor: colors.white,
    width: 24,
    height: 24,
    borderRadius: 23,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  containerIconActive: {
    backgroundColor: colors.white,
    width: 24,
    height: 24,
    borderRadius: 23,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttonActive: {
    width: 52,
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  buttonError: {
    width: 52,
    height: 32,
    backgroundColor: colors.white,
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 4,
  },
});
