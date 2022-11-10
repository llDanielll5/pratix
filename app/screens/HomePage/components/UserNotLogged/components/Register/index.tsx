import React from "react";
import { View, Text } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import colors from "../../../../../../constants/colors";
import styles from "../../../../styles";

interface RegisterProps {
  username: string;
  email: string;
  password: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  hideRegisterPassword: boolean;
  setHideRegisterPassword: (hideRegisterPassword: boolean) => void;
  createAccount: (email: string, password: string) => void;
  setModalRegister: (modalRegister: boolean) => void;
}

const Register: React.FC<RegisterProps> = (props) => {
  const {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    hideRegisterPassword,
    setHideRegisterPassword,
    setModalRegister,
    createAccount,
  } = props;

  const HidePassword = (hide: any, setHide: any) => (
    <TextInput.Icon
      name={!hide ? "eye-off" : "eye"}
      color={"black"}
      animated
      style={{ top: 2 }}
      onPress={() => {
        setHide(!hide);
      }}
      forceTextInputFocus={false}
    />
  );
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalRegister}>
        <Text style={styles.modalRegisterText}>Registrar</Text>
        <IconButton
          icon="close"
          color="black"
          size={30}
          style={{ position: "absolute", top: 10, right: 10, margin: 0 }}
          onPress={() => setModalRegister(false)}
        />

        <TextInput
          onChangeText={(text) => {
            const textReplaced = text.replace(/ /g, "");
            setUsername(textReplaced);
          }}
          label="Username"
          value={username}
          style={styles.inputRegister}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="black"
          underlineColor="black"
          activeUnderlineColor="black"
        />

        <TextInput
          onChangeText={(text) => setEmail(text)}
          label="Email"
          value={email}
          style={styles.inputRegister}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="black"
          underlineColor="black"
          activeUnderlineColor="black"
        />

        <TextInput
          onChangeText={(text) => setPassword(text)}
          label="Password"
          value={password}
          style={styles.inputRegister}
          secureTextEntry={hideRegisterPassword}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="black"
          underlineColor="black"
          activeUnderlineColor="black"
          right={HidePassword(hideRegisterPassword, setHideRegisterPassword)}
        />

        <Button
          mode="contained"
          onPress={() => createAccount(email, password)}
          color={colors.primary}
          style={styles.button}
          labelStyle={styles.labelButtonStyle}
        >
          Registrar-se
        </Button>
      </View>
    </View>
  );
};

export default Register;
