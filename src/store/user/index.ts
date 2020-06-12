import { UserAction, USER } from './types';
import { User } from '../../models';

const initialState: User = {
  id: 0,
  name: '',
};

export * from './types';
export * from './actions';

export default function rooms(state = initialState, action: UserAction): User {
  const { type, payload } = action;

  if (type === USER.LOGIN) {
    return payload as User;
  }

  return state;
}
