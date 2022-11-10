import React, { useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { TextInputEditTheme } from ".";
import { Location } from "../../../../types";
import GooglePlacesInput from "../../../components/GooglePlacesInput";
import colors from "../../../constants/colors";

interface AddressContainerProps {
  address: string;
  onChangeValues: any;
}

const AddressContainerComponent: React.FC<AddressContainerProps> = (props) => {
  const { address, onChangeValues } = props;
  const googlePlacesRef = useRef(null);
  async function selectAddress({ data, details }) {
    onChangeValues(details?.name);
  }

  return (
    <View style={styles.inputView}>
      <GooglePlacesInput
        ref={googlePlacesRef}
        address={address}
        outlineColor={colors.primary}
        onSelectAddress={selectAddress}
        stylesInput={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    marginBottom: 40,
    marginTop: 8,
    width: "100%",
    alignSelf: "center",
  },
  input: {
    backgroundColor: colors.white,
  },
});

export default AddressContainerComponent;
