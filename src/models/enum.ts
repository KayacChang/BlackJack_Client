export enum SEAT {
  DEALER = -1,
  A = 0,
  B = 1,
  C = 2,
  D = 3,
  E = 4,
}

export enum PAIR {
  L = 'L',
  R = 'R',
}

export enum CHIP {
  RED = 1,
  GREEN = 5,
  BLUE = 10,
  BLACK = 50,
  PURPLE = 100,
  YELLOW = 500,
}

export enum GAME_STATE {
  BETTING,
  DEALING,
}

export enum RANK {
  ACE = 'A',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
}

export enum SUIT {
  SPADE = 'SPADE',
  HEART = 'HEART',
  DIAMOND = 'DIAMOND',
  CLUB = 'CLUB',
}
