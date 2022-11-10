import React from "react";
import { View, Text, Image } from "react-native";
import { User } from "../../../../../types";
import { parseUserType } from "../../../../utils/parseUserType";
import { userProfileImage } from "../../../../utils/userProfileImage";
import styles from "./styles";

interface WelcomeAdmProps {
  userData: User;
}

const WelcomeAdm: React.FC<WelcomeAdmProps> = (props) => {
  const { userData } = props;
  return (
    <View style={styles.welcomeContainer}>
      <View style={{ width: "45%" }}>
        <Image
          source={{ uri: userProfileImage(userData?.profileImage) }}
          style={styles.profileImage}
        />
      </View>
      <View style={{ width: "60%" }}>
        <Text style={styles.welcomeText}>Bem-vindo {userData?.name}</Text>
        <Text style={styles.admAt}>{parseUserType(userData?.usertype)}</Text>
      </View>
    </View>
  );
};

export default WelcomeAdm;
