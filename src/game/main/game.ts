import { Container } from 'pixi.js';
import store from '../../store';
import { GAME, Hand, Card } from '../../models';
import Paths from '../components/Paths';
import { without } from 'ramda';
import Poker from '../components/Poker';

export default function Game() {
  const container = new Container();
  container.name = 'game';

  const pathContainer = new Container();
  pathContainer.name = 'paths';
  const paths = Paths();
  for (const [name, _paths] of Object.entries(paths)) {
    const group = new Container();

    group.name = name;

    group.addChild(..._paths);

    pathContainer.addChild(group);
  }
  container.addChild(pathContainer);

  const pokers = new Container();
  pokers.name = 'pokers';
  container.addChild(pokers);

  const deal = addDealSystem(pokers);

  store.subscribe(update({ deal }));

  return container;
}

type Game = {
  deal: (card: Card) => void;
};

function update({ deal }: Game) {
  let preHands: Hand[] = [];

  return function () {
    const { game, hand } = store.getState();

    if (game.state.type === GAME.BET_END) {
      preHands = hand;

      for (const { id, cards } of hand) {
        console.log(cards);

        cards.forEach(deal);
      }
    }

    if (game.state.type === GAME.TURN) {
      //
      for (const { id, cards } of hand) {
        const pre = preHands.find((pre) => pre.id === id);

        if (!pre) {
          continue;
        }

        const diff = without(pre.cards, cards);

        console.log(diff);
      }

      preHands = hand;
    }
  };
}

function addDealSystem(it: Container) {
  //
  return function (card: Card) {
    const poker = new Poker(card.suit, card.rank);
    poker.name = `${card.suit} ${card.rank}`;

    it.addChild(poker);
  };
}
