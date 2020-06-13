import { User } from '../../models';
import { UserAction, USER } from '../types';

const initialState: User = {
  name: '',
};

export default function rooms(state = initialState, action: UserAction): User {
  const { type, payload } = action;

  if ([USER.LOGIN, USER.UPDATE].includes(type)) {
    return { ...state, ...payload };
  }

  return state;
}
