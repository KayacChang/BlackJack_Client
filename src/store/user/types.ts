import { Action } from "../types";
import { User } from "../../models";

export enum USER {
  LOGIN = "USER_LOGIN",
  UPDATE = "USER_UPDATE",
}

export interface LoginAction extends Action<User> {
  type: typeof USER.LOGIN;
  payload: User;
}

export interface UpdateAction extends Action<User> {
  type: typeof USER.UPDATE;
  payload: User;
}

export type UserAction = LoginAction | UpdateAction;
