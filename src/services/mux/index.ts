import game from './game';
import lobby from './lobby';
import user from './user';
import seat from './seat';
import Service from '../service';

interface MUX {
  [name: number]: (service: Service, data: any) => any;
}

export default { ...game, ...lobby, ...user, ...seat } as MUX;
