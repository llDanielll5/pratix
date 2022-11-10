import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../../constants/colors";

import styles from "./styles";

interface AddressButtonProps {
  onPress: () => void;
  onIconPress: () => void;
  hasMagnifying?: boolean;
  text: string;
  textColor: string;
}

const AddressButton: React.FC<AddressButtonProps> = ({
  onPress,
  onIconPress,
  text,
  hasMagnifying,
  textColor,
}) => (
  <View style={styles.addressButtonContainer}>
    <TouchableOpacity
      style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasMagnifying && (
          <IconButton icon="magnify" size={24} color={colors.black} />
        )}
        <View style={{ paddingLeft: hasMagnifying ? 0 : 16 }}>
          <Text numberOfLines={1}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
    <View>
      <IconButton
        style={{ margin: 0, marginRight: 8 }}
        onPress={onIconPress}
        icon="crosshairs-gps"
        size={24}
        color={colors.black}
      />
    </View>
  </View>
);

export default AddressButton;
