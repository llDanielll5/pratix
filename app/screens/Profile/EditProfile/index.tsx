import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useRecoilState } from "recoil";
import UserData from "../../../atom/UserData";
import Loading from "../../../components/Loading";
import { updateUserInfos } from "../../../firebase/functions";
import GetImage from "../../../utils/GetImage";
import GetUserImage from "../../../utils/GetUserImage";
import { userProfileImage } from "../../../utils/userProfileImage";
import AddressContainerComponent from "./addressContainer";
import styles from "./styles";

export const TextInputEditTheme = {
  colors: {
    text: "black",
    placeholder: "#50B9E9",
  },
};

const EditProfile = ({ navigation }: any) => {
  const [userData, setUserData] = useRecoilState(UserData);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(userData?.name);
  const [address, setAddress] = useState(userData?.location);
  const [phone, setPhone] = useState<string | undefined>(userData?.phone);
  const { navigate } = navigation;
  const updateUserImage = async () => {
    const img = await GetImage();
    if (img) await GetUserImage(img, userData, setLoading, setUserData);
  };

  const updateUserInformations = async () => {
    setLoading(true);
    const newValues = {
      name: username,
      location: address,
      phone,
    };
    await updateUserInfos(newValues, userData?.username).then(() => {
      setUserData((prevState: any) => ({ ...prevState, ...newValues }));
      setLoading(false);
      navigate("Profile");
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={0.5}
        onPress={updateUserImage}
      >
        {loading ? (
          <Loading isLoading size={50} />
        ) : (
          <View>
            <Image
              source={{ uri: userProfileImage(userData?.profileImage) }}
              style={styles.userImage}
            />
            <IconButton
              icon="camera"
              color={"#50B9E9"}
              size={25}
              style={styles.cameraIcon}
            />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.container}>
        <TextInput
          label="Nome de Usuário"
          style={styles.input}
          mode="outlined"
          value={username}
          onChangeText={(text) => setUsername(text)}
          underlineColor={"#50B9E9"}
          activeUnderlineColor={"#50B9E9"}
          outlineColor={"#50B9E9"}
          activeOutlineColor={"#50B9E9"}
          theme={TextInputEditTheme}
        />

        <TextInput
          label="Seu número de telefone"
          style={styles.input}
          mode="outlined"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          underlineColor={"#50B9E9"}
          activeUnderlineColor={"#50B9E9"}
          outlineColor={"#50B9E9"}
          activeOutlineColor={"#50B9E9"}
          theme={TextInputEditTheme}
        />

        <AddressContainerComponent
          onChangeValues={(values) => setAddress(values)}
          address={address}
        />

        <Button
          mode="contained"
          onPress={updateUserInformations}
          color={"#50B9E9"}
          style={styles.button}
          labelStyle={styles.labelButtonStyle}
        >
          Salvar Mudanças
        </Button>

        <Image
          source={require("../../../../assets/logo.jpg")}
          resizeMode="cover"
          style={styles.logo}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfile;
