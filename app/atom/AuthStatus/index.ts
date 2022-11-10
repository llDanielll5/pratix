import { atom } from "recoil";
import { UserType } from "../../../enum";

interface Auth {
  isAuthenticated: boolean;
  userType: UserType | null;
}

const AuthStatus = atom<Auth>({
  key: "AuthStatus",
  default: {
    isAuthenticated: false,
    userType: null,
  },
});

export default AuthStatus;
