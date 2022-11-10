import { atom } from "recoil";
import { User } from "../../../types";

const UserData = atom<User | null>({
  key: "userData",
  default: null,
});

export default UserData;
