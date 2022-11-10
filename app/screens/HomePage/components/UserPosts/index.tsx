import React from "react";
import { View, TouchableNativeFeedback, Text, Dimensions } from "react-native";
import styles from "../UserHasLogged/styles";

interface UserPostsProps {
  item: any;
  index: number;
  openDetails: any;
}

const { width } = Dimensions.get("window");

const UserPosts: React.FC<UserPostsProps> = (props) => {
  const { item, index, openDetails } = props;
  return (
    <TouchableNativeFeedback onPress={openDetails}>
      <View style={styles.welcomeModalContainer(width)}>
        <Text style={styles.publicateText}>{item?.title}</Text>
        <Text numberOfLines={5} style={styles.innerPublicateText}>
          {item?.description}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default UserPosts;
