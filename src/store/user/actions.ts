import { UserAction, USER } from "./types";

interface LoginProp {
  user_name: string;
}

export function login({ user_name }: LoginProp): UserAction {
  return {
    type: USER.LOGIN,
    payload: {
      name: String(user_name),
    },
  };
}

interface UpdateProp {
  name: string;
  balance: number;
}

export function update({ name, balance }: UpdateProp): UserAction {
  return {
    type: USER.UPDATE,
    payload: {
      name: String(name),
      balance: Number(balance),
    },
  };
}
