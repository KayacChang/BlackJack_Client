import { useState, useEffect, useCallback } from 'react';

type TriggerFunc = (flag?: boolean | undefined) => void;

export function useTrigger(initState = false): [boolean, TriggerFunc] {
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

export function useResize<T>(fn: () => T) {
  //
  const [state, setState] = useState(fn());

  useEffect(() => {
    //
    let id = window.requestAnimationFrame(handler);

    function handler() {
      setState(fn());

      id = window.requestAnimationFrame(handler);
    }

    return () => window.cancelAnimationFrame(id);
    //
  }, [fn]);

  return state;
}

export function useOpacity(init: number): [number, string, () => void, (opacity: number) => void] {
  const [opacity, setOpacity] = useState(init);
  const [display, setDisplay] = useState(opacity > 0 ? 'block' : 'none');

  function set(opacity: number) {
    setOpacity(opacity);
    setDisplay(opacity > 0 ? 'block' : 'none');
  }

  const onTransitionEnd = useCallback(
    //
    () => setDisplay(opacity > 0 ? 'block' : 'none'),
    [opacity, setDisplay]
  );

  return [opacity, display, onTransitionEnd, set];
}
