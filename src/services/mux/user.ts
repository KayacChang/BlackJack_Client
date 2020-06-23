import { S2C } from '../../models';
import Service from '../service';
import { EVENT, LoginProp, UpdateProp } from '../types';

import store from '../../store';
import { login, update, commitBet } from '../../store/actions';

function onLogin(service: Service, { user_name }: LoginProp) {
  const res = store.dispatch(
    login({
      name: String(user_name),
      balance: 0,
      totalBet: 0,
    })
  );

  service.emit(EVENT.LOGIN, res.payload);
}

function onUpdate(service: Service, { name, balance }: UpdateProp) {
  const { user } = store.getState();

  store.dispatch(
    update({
      ...user,
      name: String(name),
      balance: Number(balance),
    })
  );
}

function onBet(service: Service, data: any) {
  const { bet } = store.getState();

  store.dispatch(commitBet(bet.history));

  return service.emit(EVENT.BET);
}

export default {
  [S2C.USER.LOGIN]: onLogin,
  [S2C.USER.UPDATE]: onUpdate,
  [S2C.USER.BET]: onBet,
};
