import { AuthSessionResult } from "expo-auth-session";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import colors from "../../../../../../constants/colors";
import styles from "../../../../styles";

interface LoginProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  hideLoginPassword: boolean;
  setHideLoginPassword: (hideLoginPassword: boolean) => void;
  setModalRegister: (modalRegister: boolean) => void;
  handleLogin: (email: string, password: string) => void;
  forgotPassword: () => void;
  loginGoogle: () => Promise<void>;
}

const Login: React.FC<LoginProps> = (props) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    hideLoginPassword,
    setHideLoginPassword,
    setModalRegister,
    handleLogin,
    loginGoogle,
    forgotPassword,
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
    <View style={{ width: "100%" }}>
      <Image
        source={require("../../../../../../../assets/logo.jpg")}
        resizeMode={"cover"}
        style={{ height: 200, alignSelf: "center", width: "100%" }}
      />

      <TextInput
        onChangeText={(text) => setEmail(text)}
        label="Email"
        value={email}
        style={styles.input}
        mode="outlined"
        outlineColor="black"
        activeOutlineColor="black"
        underlineColor="black"
        activeUnderlineColor="black"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        label="Password"
        style={styles.input}
        value={password}
        secureTextEntry={hideLoginPassword}
        mode="outlined"
        outlineColor="black"
        activeOutlineColor="black"
        underlineColor="black"
        activeUnderlineColor="black"
        right={HidePassword(hideLoginPassword, setHideLoginPassword)}
      />

      <TouchableOpacity activeOpacity={0.5} onPress={forgotPassword}>
        <Text
          style={{
            textDecorationLine: "underline",
            color: colors.primary,
            fontSize: 18,
            textAlign: "right",
            marginVertical: 8,
            margin: 4,
          }}
        >
          Esqueceu sua senha?
        </Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        onPress={() => handleLogin(email, password)}
        color={colors.primary}
        style={styles.button}
        labelStyle={styles.labelButtonStyle}
      >
        Entrar
      </Button>

      <Button
        mode="contained"
        onPress={loginGoogle}
        icon="google"
        color={colors.white}
        style={styles.buttonGoogle}
        labelStyle={styles.labelButtonGoogleStyle}
      >
        Entrar com Google
      </Button>

      <View style={styles.notAccountContainer}>
        <Text style={styles.normalText}>Não tem conta na Pratix?</Text>
        <Text onPress={() => setModalRegister(true)} style={styles.textBig}>
          Registre-se agora!
        </Text>
      </View>
    </View>
  );
};

export default Login;
