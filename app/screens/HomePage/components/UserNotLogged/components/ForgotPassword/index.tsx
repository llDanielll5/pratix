import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import colors from "../../../../../../constants/colors";
import styles from "../../../../styles";

interface ForgotPasswordComponentProps {
  email: string;
  setEmail: (email: string) => void;
  handleForgotPassword: () => void;
  toggleForgotModal: () => void;
}

const ForgotPasswordComponent: React.FC<ForgotPasswordComponentProps> = (
  props
) => {
  const { email, setEmail, handleForgotPassword, toggleForgotModal } = props;
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalRegister}>
        <View style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          <IconButton
            icon="close"
            size={30}
            color={colors.primary}
            onPress={toggleForgotModal}
            style={{ alignSelf: "flex-end", margin: 0 }}
          />
        </View>
        <TextInput
          mode="outlined"
          label={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
          style={{ width: "100%", marginBottom: 10, backgroundColor: "white" }}
        />

        <Button
          mode="contained"
          color={colors.primary}
          labelStyle={{ color: "white", fontWeight: "bold" }}
          style={styles.buttonStyle}
          onPress={handleForgotPassword}
        >
          Receber código
        </Button>
      </View>
    </View>
  );
};

export default ForgotPasswordComponent;
