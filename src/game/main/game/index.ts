import { Container } from "pixi.js";
import { SEAT } from "../../../models";
import { createHandService } from "./state";
import updateHand from "./Hand";
import updateScore from "./Score";
import { pipe } from "ramda";

export default function Game() {
  const container = new Container();
  container.name = "game";

  const pokers = new Container();
  pokers.name = "pokers";
  container.addChild(pokers);

  for (const id in SEAT) {
    if (isNaN(Number(id))) {
      continue;
    }

    const seatID = Number(id) as SEAT;
    createHandService(seatID)
      .onTransition(
        pipe(updateHand(seatID, pokers), updateScore(seatID, container))
      )
      .start();
  }

  return container;
}
