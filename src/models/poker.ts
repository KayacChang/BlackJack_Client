import { RANK, SUIT } from '../constants';

export interface Poker {
  suit: SUIT;
  rank: RANK;
}

export function toRank(rank: string): RANK {
  switch (rank) {
    case '1':
      return 'A';
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return rank;
    case 'A':
      return '10';
    case 'B':
      return 'J';
    case 'D':
      return 'Q';
    case 'E':
      return 'K';
  }

  throw new Error(`Not support this rank ${rank}`);
}

export function toSuit(suit: string): SUIT {
  switch (suit) {
    case 'A':
      return 'SPADE';
    case 'B':
      return 'HEART';
    case 'C':
      return 'DIAMOND';
    case 'D':
      return 'CLUB';
  }

  throw new Error(`Not support this suit ${suit}`);
}
