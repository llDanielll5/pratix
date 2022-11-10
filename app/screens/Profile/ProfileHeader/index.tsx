import React from "react";
import { View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { useRecoilValue } from "recoil";
import UserData from "../../../atom/UserData";
import colors from "../../../constants/colors";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { userProfileImage } from "../../../utils/userProfileImage";
import { parseUserType } from "../../../utils/parseUserType";
import styles from "../styles";

interface ProfileHeaderProps {
  onLogout: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const { onLogout } = props;
  const userData = useRecoilValue(UserData);
  return (
    <View style={styles.innerContainer}>
      <View style={{ width: "70%" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#393939" }}>
          Olá, {userData?.name}
        </Text>
        <Text style={styles.fontNormal12}>
          <Feather name="map-pin" size={12} color="#a8a8a8" />{" "}
          {userData?.location ?? ""}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "400", color: "#a8a8a8" }}>
          <Octicons name="tools" size={12} color="#a8a8a8" />{" "}
          {parseUserType(userData?.usertype)}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={{ uri: userProfileImage(userData?.profileImage) }}
        />
      </View>

      <IconButton
        icon={"logout"}
        size={30}
        color={colors.black}
        style={{ margin: 0, marginLeft: 8 }}
        onPress={onLogout}
        rippleColor={"white"}
      />
    </View>
  );
};

export default ProfileHeader;
