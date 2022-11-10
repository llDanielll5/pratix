import * as React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import styles from "./styles";
import ModalHome from "../ModalHome";
import { useRecoilValue } from "recoil";
import UserData from "../../../../atom/UserData";
import ModalWorkDetail from "../ModalWorkDetail";
import { userProfileImage } from "../../../../utils/userProfileImage";
import { parseUserType } from "../../../../utils/parseUserType";
import UserPosts from "../UserPosts";
import { Button } from "react-native-paper";
import colors from "../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { getUserInfos } from "../../../../firebase/functions";

interface HasLoggedProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

const { width } = Dimensions.get("window");

const UserHasLogged: React.FC<HasLoggedProps> = (props) => {
  const { navigate } = useNavigation();
  const { isOpen, setIsOpen, setShowModal, showModal } = props;
  const userData = useRecoilValue(UserData);
  const [data, setData] = React.useState([]);

  const AnimatedHeaderValue = new Animated.Value(0);
  const Header_Max_Height = 170;
  const Header_Min_Height = 120;

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

  const getUserPosts = async () => {
    const posts = await getUserInfos(userData?.username);
    setData([...posts?.posts]);
  };

  React.useEffect(() => {
    getUserPosts();
  }, []);

  const renderUserPosts = ({ item, index }: any) => (
    <UserPosts
      item={item}
      index={index}
      openDetails={() => setShowModal(true)}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <Animated.View
        style={styles.animatedHeader(
          animateHeaderHeight,
          isOpen,
          animateHeaderBackgroundColor
        )}
      >
        <View style={styles.innerAnimatedHeader}>
          <View style={{ width: "70%" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#393939" }}>
              Olá, {userData?.name}
            </Text>
            <Text style={styles.locationText}>
              <Feather name="map-pin" size={12} color="#a8a8a8" />
              {userData?.location ?? "Não registrado"}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#a8a8a8" }}>
              <Octicons name="tools" size={12} color="#a8a8a8" />{" "}
              {parseUserType(userData?.usertype)}
            </Text>
          </View>
          <View style={styles.imageUserContainer}>
            <Image
              style={styles.imageStyle}
              source={{ uri: userProfileImage(userData?.profileImage) }}
            />
          </View>
        </View>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={styles.scrollAnimated}
      >
        <View style={styles.welcomeContainer}>
          <Text style={{ fontSize: 25, fontWeight: "800", color: "#393939" }}>
            Welcome to Pratix!
          </Text>
          <TouchableNativeFeedback
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              setIsOpen(true);
            }}
          >
            <View style={styles.modalBackground}>
              <ImageBackground
                style={styles.imageBackgroundModal}
                source={require("../../../../icons/icon8.png")}
                resizeMode="cover"
              />
              <View style={styles.connectBusinessContainer}>
                <Text style={{ fontWeight: "300", fontSize: 27 }}>
                  Connect your {"\n"}Business
                </Text>
                <Text style={styles.moreText}>More About</Text>
              </View>
              <View style={styles.exploreContainer}>
                <Text style={styles.exploreText}>Explore</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={styles.yourPostsContainer}>
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#393939" }}>
            Your Posts
          </Text>
          <View>
            {userData?.posts?.length > 0 ? (
              <FlatList
                data={userData?.posts}
                keyExtractor={(item, index) => `${item}${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment={"start"}
                snapToOffsets={[...Array(userData?.posts?.length)].map(
                  (x, i) => i * (width * 0.8 - 40) + (i - 1) * 40
                )}
                decelerationRate="fast"
                style={{ marginTop: 0 }}
                scrollEventThrottle={16}
                renderItem={renderUserPosts}
              />
            ) : (
              <View style={styles.notAddedWorks}>
                <Text style={styles.notAddedText}>
                  Você ainda não adicionou trabalhos.
                </Text>
                <Button
                  mode="contained"
                  onPress={() => navigate("Panel")}
                  color={colors.primary}
                  style={styles.button}
                  labelStyle={styles.labelButtonStyle}
                  uppercase={false}
                >
                  Adicionar Agora!
                </Button>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <ModalWorkDetail
        visible={showModal}
        closeModal={() => setShowModal(false)}
      />
      <ModalHome isOpen={isOpen} setIsOpen={setIsOpen} />
    </ScrollView>
  );
};

export default UserHasLogged;
