import { USER } from '../../models';
import Service from '../service';
import { EVENT, LoginProp, UpdateProp } from '../types';

import store from '../../store';
import { login, update } from '../../store/actions';

function onLogin(service: Service, { user_name }: LoginProp) {
  const res = store.dispatch(
    login({
      name: String(user_name),
    })
  );

  return service.emit(EVENT.LOGIN, res.payload);
}

function onUpdate(service: Service, { name, balance }: UpdateProp) {
  return store.dispatch(
    update({
      name: String(name),
      balance: Number(balance),
    })
  );
}

export default {
  [USER.LOGIN]: onLogin,
  [USER.UPDATE]: onUpdate,
};
