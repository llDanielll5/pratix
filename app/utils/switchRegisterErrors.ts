import { REGISTER_ERRORS } from "../../enum";

export const SwitchRegisterErrors = (error: any) => {
  switch (error.code) {
    case REGISTER_ERRORS.EMAIL_ALREADY_IN_USE:
      alert("O email já está em uso!");
      return;
    case REGISTER_ERRORS.INVALID_EMAIL:
      alert("O email é inválido!");
      return;
    case REGISTER_ERRORS.OPERATION_NOT_ALLOWED:
      alert("O cadastro não está habilitado!");
      return;
    case REGISTER_ERRORS.WEAK_PASSWORD:
      alert("A senha é muito fraca!");
      return;
  }
};
