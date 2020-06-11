import { EVENT } from './type';
import Service from './service';
import { User } from '../models';
import { CLIENT } from '../constants';

export default async function (service: Service): Promise<User> {
  console.groupCollapsed('Login');

  const request = {
    cmd: CLIENT.LOGIN,
    data: undefined,
  };

  console.log(request);
  service.send(request);

  const response = await new Promise((resolve) => service.once(EVENT.LOGIN, resolve));
  const user = new User(response);

  console.log(user);
  console.groupEnd();

  return user;
}
