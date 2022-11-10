import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles";

interface ProfileCardProps {
  title: string;
  firstSubtitle: string;
  secondSubtitle: string;
  thirdSubtitle: string;
  firstValue: string;
  secondValue: string;
  thirdValue: string;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const {
    title,
    firstSubtitle,
    secondSubtitle,
    thirdSubtitle,
    firstValue,
    secondValue,
    thirdValue,
  } = props;
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 18 }}>
        {title}
      </Text>
      <View style={styles.privateDates}>
        <Text style={styles.poppinsMedium14}>
          {firstSubtitle}: {firstValue}
        </Text>
        <Text style={styles.poppinsMedium14}>
          {secondSubtitle}: {secondValue}
        </Text>
        <Text style={styles.poppinsMedium14}>
          {thirdSubtitle}: {thirdValue}
        </Text>
      </View>
    </View>
  );
};

export default ProfileCard;
