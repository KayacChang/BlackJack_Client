import { S2C } from '../../models';
import Service from '../service';

import store from '../../store';
import { updateSeats } from '../../store/actions';
import { EVENT, SeatProp, toSeats } from '../types';

function onUpdate(service: Service, data: SeatProp[]) {
  const action = store.dispatch(updateSeats(toSeats(data)));

  service.emit(EVENT.UPDATE_SEAT, action.payload);
}

export default {
  [S2C.SEAT.UPDATE]: onUpdate,
};
