import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useRecoilValue, useResetRecoilState } from "recoil";
import UserData from "../../atom/UserData";
import styles from "./styles";
import ProfileCard from "./components/ProfileCard";
import { userProfileImage } from "../../utils/userProfileImage";
import { getAuth } from "firebase/auth";
import app from "../../firebase/base";
import AuthStatus from "../../atom/AuthStatus";
import Loading from "../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import ProfileHeader from "./ProfileHeader";

export default function Profile({ navigation }: any) {
  const userData = useRecoilValue(UserData);
  const widthDevice = useWindowDimensions().width;
  const ResetAuthStatus = useResetRecoilState(AuthStatus);
  const ResetUserData = useResetRecoilState(UserData);
  const [loading, setLoading] = useState(false);
  const { navigate } = navigation;
  const auth = getAuth(app);
  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Max_Height = 130;
  const Header_Min_Height = 100;

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ["#fff", "#fff"],
    extrapolate: "clamp",
  });
  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  async function handleLogout() {
    setLoading(true);
    await GoogleSignin.signOut();
    await auth
      .signOut()
      .then(() => {
        AsyncStorage.clear().then(() => {
          AsyncStorage.setItem("@first_access", "true").then(() => {
            ResetAuthStatus();
            ResetUserData();
            setLoading(false);
            navigate("NotLogged");
          });
        });
      })
      .catch((error) => {
        setLoading(false);
        alert("Erro ao fazer logout, tente novamente mais tarde.");
        console.log(error);
      });
  }

  const LoadingView = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText(widthDevice)}>
        Estamos te deslogando do app! Aguarde um pouco.
      </Text>
      <Loading isLoading size={100} style={styles.loading} color={"white"} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.firstAnimatedView(
          animateHeaderHeight,
          animateHeaderBackgroundColor
        )}
      >
        <ProfileHeader onLogout={handleLogout} />
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ marginTop: 160 }} />
        {loading && <LoadingView />}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.bigImage}
            source={{ uri: userProfileImage(userData?.profileImage) }}
          />
          <View style={{ paddingVertical: 20 }}>
            <Text style={styles.username}>{userData?.name}</Text>
            <Text style={styles.phone}>{userData?.phone ?? ""}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigate("EditProfile")}
          style={{ alignSelf: "center" }}
        >
          <Text style={styles.changeDatesText}>Alterar Dados de usuário</Text>
        </TouchableOpacity>

        <ProfileCard
          title="Estatísticas do Perfil"
          firstSubtitle="Trabalhos Realizados"
          secondSubtitle="Trabalhos Postados"
          thirdSubtitle="Trabalhos Avaliados"
          firstValue={`${"0"} usuários`}
          secondValue={`${"0"} usuários`}
          thirdValue={"0"}
        />

        <ProfileCard
          title="Credenciais"
          firstSubtitle="E-mail"
          secondSubtitle="Total de vagas disponibilizadas"
          thirdSubtitle="Telefone"
          firstValue={userData?.email ?? ""}
          secondValue={userData?.posts?.length ?? "0"}
          thirdValue={userData?.phone ?? ""}
        />
      </ScrollView>
    </View>
  );
}
