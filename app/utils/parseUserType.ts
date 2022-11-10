import { UserType } from "../../enum";

export const parseUserType = (userType: UserType) => {
  switch (userType) {
    case UserType.FREE:
      return "Gratuito";
    case UserType.PREMIUM:
      return "Premium";
    case UserType.ADM:
      return "Administrador";
  }
};
