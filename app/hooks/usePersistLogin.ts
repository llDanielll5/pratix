import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AuthStatus from "../atom/AuthStatus";
import UserData from "../atom/UserData";
import { getLoginGoogleInfos } from "../firebase/functions";

export async function usePersistLogin() {
  const [authStatus, setAuthStatus] = useRecoilState(AuthStatus);
  const [userData, setUserData] = useRecoilState(UserData);
  async function getUserData(userData: any) {
    const result = await getLoginGoogleInfos(userData.id);
    if (result) {
      setUserData({ ...result });
      setAuthStatus({ isAuthenticated: true, userType: result.usertype });
    }
  }

  async function loadingStorage() {
    const storage = await AsyncStorage.getItem("pratixapp");

    if (storage) {
      const data = JSON.parse(storage);

      await getUserData(data);
    }
  }

  useEffect(() => {
    loadingStorage();
  }, []);
}
