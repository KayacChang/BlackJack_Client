import { User } from '../../models';
import { UserAction, USER } from '../types';

const initialState: User = {
  name: '',
  balance: 0,
  totalBet: 0,
};

export default function userReducer(state = initialState, action: UserAction): User {
  const { type, payload } = action;

  if ([USER.LOGIN, USER.UPDATE].includes(type)) {
    return { ...state, ...payload };
  }

  return state;
}
