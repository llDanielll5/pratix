import * as Localization from "expo-localization";
import React, { Ref, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { Modal, Portal, TextInput } from "react-native-paper";
import colors from "../../constants/colors";
import styles from "./styles";

interface GooglePlaceInputResponse {
  data: GooglePlaceData;
  details: GooglePlaceDetail | null;
}

type GooglePlacesInputRef = object;

interface GooglePlacesInputProps {
  onSelectAddress?: (response: GooglePlaceInputResponse) => void;
  address?: string | null;
  stylesInput?: any;
  initialAddress?: string;
  outlineColor?: string;
  noLabel?: boolean;
  ref: Ref<GooglePlacesInputRef>;
}

const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  onSelectAddress,
  initialAddress,
  address,
  outlineColor,
  noLabel,
  stylesInput,
  ref,
}) => {
  const googlePlaceRef = useRef<GooglePlacesAutocompleteRef | null>(null);

  const [visible, setVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(
    initialAddress || "Pesquisar localização"
  );

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onSelect = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    setCurrentAddress(data.description);
    onSelectAddress?.({ data, details });
    hideModal();
  };

  useEffect(() => {
    if (initialAddress) setCurrentAddress(initialAddress);
    if (address) setCurrentAddress(address);
  }, [initialAddress, address]);

  return (
    <View style={styles.mainContainer}>
      <Portal>
        <Modal
          style={{ alignItems: "center" }}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <GooglePlacesAutocomplete
            ref={googlePlaceRef}
            currentLocation
            placeholder={"Digite um endereço"}
            fetchDetails
            enablePoweredByContainer={false}
            onFail={(e) => console.log(e)}
            onPress={onSelect}
            styles={{
              textInput: {
                borderWidth: 1,
              },
            }}
            query={{
              key: "AIzaSyDvlPM9zTZnUemnIqjnwFNtY-_8x4KtXrI",
              language: Localization.locale,
            }}
          />
        </Modal>
      </Portal>
      <TextInput
        mode="outlined"
        label={!noLabel ? `Endereço *` : false}
        placeholder={currentAddress}
        value={currentAddress}
        outlineColor={outlineColor}
        onFocus={showModal}
        clearTextOnFocus
        activeOutlineColor={outlineColor ?? "#000"}
        style={stylesInput ?? styles.input}
        right={
          <TextInput.Icon
            onPress={showModal}
            name={"magnify"}
            color={colors.black}
            size={24}
            style={styles.iconInput}
            forceTextInputFocus={false}
          />
        }
      />
    </View>
  );
};

export default GooglePlacesInput;
