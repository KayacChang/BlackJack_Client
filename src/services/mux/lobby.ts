import { SERVER } from '../../models';
import Service from '../service';

import store from '../../store';
import { addRoom, editRoom } from '../../store/actions';

export default {
  [SERVER.LOBBY]: (service: Service, data: any) => store.dispatch(addRoom(...data)),
  [SERVER.UPDATE_LOBBY]: (service: Service, data: any) => store.dispatch(editRoom(data)),
};
