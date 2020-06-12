import { EVENT } from './type';
import Service from './service';
import { CLIENT } from '../constants';

export default async function (service: Service): Promise<any> {
  console.groupCollapsed('Login');

  service.send({
    cmd: CLIENT.LOGIN,
    data: undefined,
  });

  const user = await new Promise<any>((resolve) => service.once(EVENT.LOGIN, resolve));

  console.groupEnd();

  return user;
}
