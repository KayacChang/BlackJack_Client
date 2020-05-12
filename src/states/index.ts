import { useState } from "react";

export function useTrigger(initState = false): [boolean, () => void] {
  //
  const [state, setState] = useState(initState);

  function trigger() {
    setState(!state);
  }

  return [state, trigger];
}
