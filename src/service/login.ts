import { EVENT, CLIENT } from './type';
import Service from './service';
import { User } from '../models';

export default async function login(service: Service): Promise<User> {
  console.groupCollapsed('Login');

  const request = {
    cmd: CLIENT.LOGIN,
    token: '$2y$10$g27N1Zk/EuqTZQYBkSmWhel0VEOln2ZNmbIvrItEbkyoV77nHhZ6u',
    game_token: '',
    game_id: '209B407F0F9751E3B87751FD8C99EDC9',
  };

  console.log(request);

  service.send(request);

  const response = await new Promise((resolve) => {
    //
    service.once(EVENT.LOGIN, (message) => resolve(message));
  });

  console.log(response);

  console.groupEnd();

  const { user_id, user_name } = response as any;

  return {
    id: Number(user_id),
    name: String(user_name),
  };
}
