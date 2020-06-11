import { EVENT } from './type';
import Service from './service';
import { User } from '../models';
import { CLIENT } from '../constants';

export default async function (service: Service): Promise<User> {
  console.groupCollapsed('Login');

  service.send({
    cmd: CLIENT.LOGIN,
    data: undefined,
  });

  const user = await new Promise<User>((resolve) => service.once(EVENT.LOGIN, resolve));

  console.groupEnd();

  return user;
}
