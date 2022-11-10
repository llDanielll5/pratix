import React from "react";
import { ImageBackground, View, Text, TouchableOpacity } from "react-native";
import Modalbox from "react-native-modalbox";
import styles from "../UserHasLogged/styles";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalHome: React.FC<ModalProps> = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modalbox
      isOpen={isOpen}
      onClosed={() => setIsOpen(false)}
      style={[
        styles.modal,
        styles.modal3,
        { zIndex: 999, position: "absolute" },
      ]}
    >
      <View style={styles.modalBoxContainer}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../../../icons/icon8.png")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.modalWelcome}>
        <Text style={{ color: "#000000", fontSize: 18, fontWeight: "700" }}>
          Welcome to Pratix
        </Text>
        <View style={{ paddingVertical: 15 }}>
          <Text style={{ fontSize: 14, color: "#8c8c8c", lineHeight: 20 }}>
            Temos prazer de apresentar a Pratix, uma empresa de tecnologia com a
            missão de conectar Empregadores e Empregados, desenvolvemos um
            aplicativo que conecta você a qualquer tipo de serviço, da manicure
            ao designer.
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, width: "100%", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => setIsOpen(false)}
          style={styles.continue}
        >
          <Text>Continuar</Text>
        </TouchableOpacity>
      </View>
    </Modalbox>
  );
};

export default ModalHome;
