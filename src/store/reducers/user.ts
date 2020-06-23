import { User, Bet } from '../../models';
import { UserAction, USER, BET, BetAction } from '../types';

const initialState: User = {
  name: '',
  balance: 0,
  totalBet: 0,
};

export default function userReducer(state = initialState, action: UserAction | BetAction): User {
  const { type, payload } = action;

  if ([USER.LOGIN, USER.UPDATE].includes(type)) {
    const user = payload as User;

    return { ...state, ...user };
  }

  if (type === BET.ADD) {
    const { amount } = payload as Bet;

    return {
      ...state,
      balance: state.balance - amount,
      totalBet: state.totalBet + amount,
    };
  }

  return state;
}
