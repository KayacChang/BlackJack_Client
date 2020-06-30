import { S2C } from '../../models';
import Service from '../service';
import { EVENT, LoginProp, UpdateProp, ActionProp } from '../types';

import store from '../../store';
import { login, update, commitBet } from '../../store/actions';

function onLogin(service: Service, { user_name }: LoginProp) {
  store.dispatch(
    login({
      name: String(user_name),
      balance: 0,
      totalBet: 0,
    })
  );
}

function onUpdate(service: Service, { name, balance }: UpdateProp) {
  const { user } = store.getState();

  const res = store.dispatch(
    update({
      ...user,
      name: String(name),
      balance: Number(balance),
    })
  );

  service.emit(EVENT.UPDATE_USER, res.payload);
}

function onBet(service: Service, data: any) {
  const { bet } = store.getState();

  store.dispatch(commitBet(bet.history));

  return service.emit(EVENT.BET);
}

function onAction(service: Service, data: ActionProp | undefined) {
  return service.emit(EVENT.DECISION, data?.action);
}

export default {
  [S2C.USER.LOGIN]: onLogin,
  [S2C.USER.UPDATE]: onUpdate,
  [S2C.USER.BET]: onBet,
  [S2C.USER.ACTION]: onAction,
};
