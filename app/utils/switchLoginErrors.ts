import { LOGIN_ERRORS } from "../../enum";

export const SwitchLoginErrors = (error: any) => {
  switch (error.code) {
    case LOGIN_ERRORS.USER_NOT_FOUND:
      alert("Usuário não encontrado!");
      return;
    case LOGIN_ERRORS.WRONG_PASSWORD:
      alert("Senha incorreta!");
      return;
    case LOGIN_ERRORS.INVALID_EMAIL:
      alert("O email é inválido!");
      return;
  }
};
