import { required } from '../utils';

const checkRequire = required(['user_name']);

export default class User {
  id?: number;
  name: string;

  constructor(data: any) {
    if (!checkRequire(data)) {
      throw new Error(`Required properties ... ${JSON.stringify(data)}`);
    }

    if (data.user_id) {
      this.id = Number(data.user_id);
    }

    this.name = String(data.user_name);
  }
}
