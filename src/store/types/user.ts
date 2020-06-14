import { Action } from './base';
import { User } from '../../models';

const PREFIX = '[USER]';

export const USER = Object.freeze({
  LOGIN: `${PREFIX} LOGIN`,
  UPDATE: `${PREFIX} UPDATE`,
});

export interface LoginAction extends Action<User> {
  type: typeof USER.LOGIN;
  payload: User;
}

export interface UpdateAction extends Action<User> {
  type: typeof USER.UPDATE;
  payload: User;
}

export type UserAction = LoginAction | UpdateAction;
