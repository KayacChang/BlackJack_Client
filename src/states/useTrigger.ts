import { useState } from "react";

export default function useTrigger(initState = false): [boolean, () => void] {
  //
  const [state, setState] = useState(initState);

  function trigger() {
    setState((state) => !state);
  }

  return [state, trigger];
}
