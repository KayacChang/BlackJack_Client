import { EVENT } from './type';
import Service from './service';
import { CLIENT, User } from '../models';

export default async function login(service: Service): Promise<User> {
  console.groupCollapsed('Login');

  service.send({
    cmd: CLIENT.LOGIN,
    data: undefined,
  });

  const user = await new Promise<User>((resolve) => service.once(EVENT.LOGIN, resolve));

  console.log(user);

  console.groupEnd();

  return user;
}