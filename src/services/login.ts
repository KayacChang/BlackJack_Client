import { EVENT } from './type';
import Service from './service';
import { User, CLIENT } from '../models';

export default async function (service: Service): Promise<User> {
  console.groupCollapsed('Login');

  const request = {
    cmd: CLIENT.LOGIN,
    data: undefined,
  };

  console.log(request);
  service.send(request);

  const response = await new Promise((resolve) => service.once(EVENT.LOGIN, resolve));

  console.log(response);
  console.groupEnd();

  const { user_id, user_name } = response as any;

  return {
    id: Number(user_id),
    name: String(user_name),
  };
}
