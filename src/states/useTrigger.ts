import { useState } from "react";

type TriggerFunc = (flag?: boolean | undefined) => void;

export default function useTrigger(initState = false): [boolean, TriggerFunc] {
  //
  const [state, setState] = useState(initState);

  function trigger(flag?: boolean) {
    //
    if (flag === undefined) {
      return setState(!state);
    }

    setState(flag);
  }

  return [state, trigger];
}
