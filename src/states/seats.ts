import { User, Poker } from '../models';
import { SEAT } from '../constants';

interface Seat {
  player: User;
  cards: Poker[];
  points?: number;
}

const seats = new Map<SEAT, Seat>();

function clear() {
  seats.clear();
}

function add(seatID: SEAT, player: User) {
  //
  seats.set(seatID, {
    player: player,
    cards: [],
  });
}

function remove(seatID: SEAT) {
  seats.delete(seatID);
}

function addCard(seatID: SEAT, card: Poker, points: number) {
  //
  const seat = seats.get(seatID);

  if (!seat) {
    throw new Error(`Seat ${seatID} not exist...`);
  }
  seat.cards = [...seat.cards, card];
  seat.points = points;

  console.groupCollapsed(`DEAL ${SEAT[seatID]}`, card, points);
  console.log({
    card: card,
    hands: seat.cards,
    points: points,
  });
  console.groupEnd();
}

function clearCards() {
  //
  for (const [, seat] of seats) {
    seat.cards = [];
  }
}

export default {
  clear,
  add,
  remove,
  addCard,
  clearCards,
};
