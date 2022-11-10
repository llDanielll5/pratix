import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { Modal, View } from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  deleteUser,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  addNewUser,
  getLoginGoogleInfos,
  getUserInfos,
  userExists,
} from "../../../../firebase/functions";
import styles from "../../styles";
import AuthStatus from "../../../../atom/AuthStatus";
import UserData from "../../../../atom/UserData";
import Login from "./components/Login";
import Register from "./components/Register";
import app from "../../../../firebase/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SwitchRegisterErrors } from "../../../../utils/switchRegisterErrors";
import { SwitchLoginErrors } from "../../../../utils/switchLoginErrors";
import { Timestamp } from "firebase/firestore";
import { UserType } from "../../../../../enum";
import { User } from "../../../../../types";
import { hasPremium } from "../../../../services/purchase";

const UserNotLogged = ({ navigation }: any) => {
  const { navigate } = navigation;
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);
  const [hideLoginPassword, setHideLoginPassword] = useState(true);
  const [{ isAuthenticated }, setAuthStatus] = useRecoilState(AuthStatus);
  const [hideRegisterPassword, setHideRegisterPassword] = useState(true);
  const setUserData = useSetRecoilState(UserData);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const storageUser = async (data: any) => {
    await AsyncStorage.setItem("pratixapp", JSON.stringify(data));
  };

  const changeRecoilState = async (authUser: any, { username }: any) => {
    const hasUser = await userExists(username);
    const userValues: User = {
      id: authUser.user.uid,
      email: authUser.user.email,
      username: username,
      name: username,
      location: "",
      phone: "",
      profileImage: "",
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: "",
      usertype: UserType.FREE,
      posts: [],
    };
    if (hasUser) {
      setLoading(false);
      const user = auth.currentUser;
      deleteUser(user).then(() => {
        alert("O nome de usuário já está em uso!");
        auth.signOut();
      });
    } else {
      addNewUser(userValues, username)
        .then(async () => {
          await updateProfile(authUser.user, {
            displayName: username,
          }).then(() => {
            storageUser({ ...userValues, password: password });
            setUserData({ ...userValues });
            setAuthStatus({
              isAuthenticated: true,
              userType: userValues.usertype,
            });
          });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.message);
        });
    }
  };

  const createAccount = async (email: string, password: string) => {
    setModalRegister(false);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          if (userCredential) changeRecoilState(userCredential, { username });
        }
      );
    } catch (error) {
      setLoading(false);
      SwitchRegisterErrors(error);
    }
  };

  const changeLoginRecoil = async (authUser: any) => {
    const userResult = await getUserInfos(authUser.user.displayName);
    if (userResult) {
      const premium = await hasPremium();
      storageUser({ ...userResult, password: password });
      setUserData({ ...userResult });
      setAuthStatus({
        isAuthenticated: true,
        userType: premium ? UserType.PREMIUM : UserType.FREE,
      });
    }
  };

  const handleLogin = async (email: string, password: any) => {
    setLoading(true);
    try {
      const authUser = await signInWithEmailAndPassword(auth, email, password);
      if (authUser) changeLoginRecoil(authUser);
    } catch (error) {
      setLoading(false);
      SwitchLoginErrors(error);
    }
  };

  async function createUserWithGoogleLogin(result: any) {
    const userValues: User = {
      id: result.user.uid,
      email: result.user.email,
      username: result?.user?.displayName,
      name: result.user.displayName,
      location: "",
      phone: "",
      profileImage: "",
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: "",
      usertype: UserType.FREE,
      posts: [],
    };
    addNewUser(userValues, result?.user?.displayName)
      .then(async () => {
        await updateProfile(result.user, {
          displayName: result?.displayName,
        }).then(() => {
          storageUser({ ...userValues });
          setUserData({ ...userValues });
          setAuthStatus({
            isAuthenticated: true,
            userType: userValues.usertype,
          });
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
      navigate("HomeTab");
    }
  }, [isAuthenticated]);

  const [request, response, googlePromptLogin] = Google.useIdTokenAuthRequest({
    clientId:
      "959406397450-nrr5ne7pjua2t480th9d1fklktl3k5a3.apps.googleusercontent.com",
    expoClientId:
      "959406397450-nrr5ne7pjua2t480th9d1fklktl3k5a3.apps.googleusercontent.com",
    webClientId:
      "959406397450-nrr5ne7pjua2t480th9d1fklktl3k5a3.apps.googleusercontent.com",
  });

  async function handleLoginWithGoogleAccount(userResult: any) {
    storageUser({ ...userResult });
    setUserData({ ...userResult });
    setAuthStatus({ isAuthenticated: true, userType: userResult.usertype });
  }

  const GoogleLoginFirebase = async () => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth(app);
      const credential = GoogleAuthProvider.credential(id_token);
      const result = await signInWithCredential(auth, credential);
      if (result?.user) {
        const hasUser = await getLoginGoogleInfos(result?.user?.uid);
        hasUser
          ? handleLoginWithGoogleAccount(hasUser)
          : createUserWithGoogleLogin(result);
      }
    }
  };

  const handlePromptGoogleLogin: any = async () => {
    try {
      setLoading(true);
      await googlePromptLogin();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    GoogleLoginFirebase();
  }, [response]);

  return (
    <View style={styles.notLoggedContainer}>
      <Login
        handleLogin={handleLogin}
        hideLoginPassword={hideLoginPassword}
        setHideLoginPassword={setHideLoginPassword}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        setModalRegister={setModalRegister}
        loginGoogle={handlePromptGoogleLogin}
      />

      <Modal
        visible={modalRegister}
        transparent={true}
        onRequestClose={() => setModalRegister(false)}
        onDismiss={() => setModalRegister(false)}
        animationType="slide"
      >
        <Register
          createAccount={createAccount}
          hideRegisterPassword={hideRegisterPassword}
          setHideRegisterPassword={setHideRegisterPassword}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setModalRegister={setModalRegister}
        />
      </Modal>
    </View>
  );
};

export default UserNotLogged;
