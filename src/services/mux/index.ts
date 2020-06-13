import game from './game';
import lobby from './lobby';
import user from './user';
import Service from '../service';

interface MUX {
  [name: number]: (service: Service, data: any) => any;
}

export default { ...game, ...lobby, ...user } as MUX;
