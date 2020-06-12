import { Props, UserAction, USER } from './types';
import { User } from '../../models';

function toUser({ user_id, user_name }: Props): User {
  return {
    id: Number(user_id),
    name: String(user_name),
  };
}

export function login(props: Props): UserAction {
  return {
    type: USER.LOGIN,
    payload: toUser(props),
  };
}
