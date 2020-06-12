import { Action } from '../types';
import { User } from '../../models';

export enum USER {
  LOGIN = 'USER_LOGIN',
}

export interface LoginAction extends Action<User> {
  type: typeof USER.LOGIN;
  payload: User;
}

export type UserAction = LoginAction;

export interface Props {
  user_id: number;
  user_name: string;
}
