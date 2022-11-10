import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import styles from "./styles";
import { Text, Image, View, Animated } from "react-native";
import UserData from "../../atom/UserData";
import { useRecoilValue } from "recoil";
import { userProfileImage } from "../../utils/userProfileImage";
import NearbyWorks from "./components/NearbyWorks";
import ModalOpenWork from "./components/ModalOpenWork";
import { parseUserType } from "../../utils/parseUserType";
import { useGetUserLocation } from "../../hooks/useGetUserLocation";
import { Posts } from "../../../types";
import { queryPostsDocument } from "../../firebase/functions";
import Loading from "../../components/Loading";
import GetPremium from "../../components/GetPremium";

const Nearby = () => {
  const userData = useRecoilValue(UserData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [indexPost, setIndexPost] = useState(0);
  const [locale, setLocale] = useState<string | null>(null);
  const [data, setData] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [premiumModal, setPremiumModal] = useState(false);
  const { address } = useGetUserLocation();

  useEffect(() => {
    if (!address) return;
    else setLocale(`${address[0].subregion}`);
  }, [address]);

  async function getAllPostsNearby() {
    setLoading(true);
    const result = await queryPostsDocument("location", "==", locale as string);
    setData(result);
    setLoading(false);
  }

  useEffect(() => {
    getAllPostsNearby();
  }, [locale]);

  const modalfr = (index: number) => {
    setIndexPost(index);
    setShowModal(true);
  };

  const LoadingContext = () => (
    <Loading isLoading size={50} style={{ marginTop: 50, height: 50 }} />
  );

  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Max_Height = 130;
  const Header_Min_Height = 100;

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ["#fff", "#fff"],
    extrapolate: "clamp",
  });
  const animateHeaderDisplay = AnimatedHeaderValue.interpolate({
    inputRange: [0, 130 - 100],
    outputRange: [0, -45],
    extrapolate: "clamp",
  });
  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.firstAnimatedView(
          animateHeaderHeight,
          animateHeaderBackgroundColor
        )}
      >
        <View style={{ width: "100%" }}>
          <Animated.View style={styles.userContainer(animateHeaderDisplay)}>
            <View>
              <View style={styles.userInfoContainer}>
                <View style={{ width: "70%" }}>
                  <Text style={styles.font16}>Olá, {userData?.name}</Text>
                  <Text style={styles.nameContext}>
                    <Feather name="map-pin" size={12} color="#a8a8a8" />{" "}
                    {userData?.location}
                  </Text>
                  <Text style={styles.textUserType}>
                    <Octicons name="tools" size={12} color="#a8a8a8" />{" "}
                    {parseUserType(userData?.usertype)}
                  </Text>
                </View>
                <View style={styles.userImageContainer}>
                  <Image
                    source={{ uri: userProfileImage(userData?.profileImage) }}
                    style={styles.imageUser}
                  />
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </Animated.View>

      <View style={styles.contentScroll}>
        {loading && <LoadingContext />}
        {!loading && (
          <NearbyWorks
            modalfr={modalfr}
            locale={locale}
            data={data}
            search={search}
            openPremiumModal={() => setPremiumModal(true)}
          />
        )}

        <ModalOpenWork
          visible={showModal}
          closeModal={() => setShowModal(false)}
          indexPost={indexPost}
          data={data}
        />
        <StatusBar style="dark" backgroundColor="#fff" />
      </View>
      <GetPremium
        visible={premiumModal}
        onPurchase={async () => {}}
        onClose={() => setPremiumModal(false)}
      />
    </View>
  );
};

export default Nearby;
