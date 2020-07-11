import { Container } from "pixi.js";
import { SEAT, PAIR, Hand } from "../../../models";
import { HandsState } from "./state";
import Score from "./Field";
import { config } from "./static";
import { propEq } from "ramda";
import { Bust } from "./icon";
import { tween } from "./anim";

export default function updateScore(id: SEAT, layer: Container) {
  //
  const scores = new Container();
  layer.addChild(scores);

  const results = new Container();
  layer.addChild(results);

  function setScore(pos: { x: number; y: number }, hands: Hand[]) {
    const score = Math.max(...hands.map(({ points }) => points));

    const field = new Score();

    const offsetY = 70;
    field.position.set(pos.x, pos.y + offsetY);

    field.text = String(score);

    scores.addChild(field);

    if (score > 21) {
      const bust = Bust();

      bust.position.set(pos.x, pos.y);

      tween(bust, { y: pos.y - 200 });

      results.addChild(bust);
    }
  }

  return function update(state: HandsState) {
    if (!state.changed) {
      return state;
    }

    scores.removeChildren();

    if (state.matches("idle")) {
      results.removeChildren();

      return state;
    }

    if (state.matches("normal") && state.context.latest.length > 0) {
      setScore(config["normal"][id], state.context.history);

      return state;
    }

    if (state.matches("split") && state.context.latest.length > 0) {
      [PAIR.L, PAIR.R].forEach((pair) =>
        setScore(
          config["split"][id][pair],
          state.context.history.filter(propEq("pair", pair))
        )
      );

      return state;
    }

    return state;
  };
}
