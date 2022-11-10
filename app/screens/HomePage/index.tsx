import React, { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "./styles";
import AuthStatus from "../../atom/AuthStatus";
import UserHasLogged from "./components/UserHasLogged";
import UserData from "../../atom/UserData";
import { UserType } from "../../../enum";
import AdmHome from "./components/AdmHome";
import Switch from "../../components/Switch";

const HomePage = ({ navigation }: any) => {
  const [{ isAuthenticated, userType }, setAuth] = useRecoilState(AuthStatus);
  const userData = useRecoilValue(UserData);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const widthDevice = useWindowDimensions().width;

  const selectedAdminPanel = () => {
    if (userType === UserType.ADM) return true;
    else return false;
  };

  function changeUserTypeState() {
    setAuth((prevStatus) => ({
      ...prevStatus,
      userType: userType === UserType.ADM ? UserType.FREE : UserType.ADM,
    }));
  }

  return (
    <View style={{ flex: 1, alignItems: "center", maxWidth: widthDevice }}>
      {userData?.usertype === UserType.FREE ||
      userData?.usertype === UserType.PREMIUM ? (
        <UserHasLogged
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      ) : (
        <View
          style={{ flex: 1, backgroundColor: "#fff", maxWidth: widthDevice }}
        >
          <View>
            <View style={styles.switchContainer}>
              <Switch
                isSelected={selectedAdminPanel()}
                icon={userType === UserType.ADM ? "account-star" : "account"}
                iconActive
                onPress={changeUserTypeState}
              />
              <Text style={styles.panel}>
                {userType === UserType.ADM
                  ? "Painel Administrador"
                  : "Painel Comum"}
              </Text>
            </View>
            {userType === UserType.ADM ? (
              <AdmHome />
            ) : (
              <UserHasLogged
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setShowModal={setShowModal}
                showModal={showModal}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default HomePage;
