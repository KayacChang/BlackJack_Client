import { useState, useEffect } from 'react';
import { useSpring } from 'react-spring';

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
  const [state, setState] = useState(fn());

  useEffect(() => {
    let id = window.requestAnimationFrame(handler);

    function handler() {
      setState(fn());

      id = window.requestAnimationFrame(handler);
    }

    return () => window.cancelAnimationFrame(id);
  }, [fn]);

  return state;
}

export function useOpacity(init: number): [any, (opacity: number) => void] {
  const [opacity, setOpacity] = useState(init);
  const [display, setDisplay] = useState(opacity > 0 ? 'block' : 'none');

  function set(opacity: number) {
    setDisplay(opacity > 0 ? 'block' : 'none');
    setOpacity(opacity);
  }

  const style = useSpring({
    to: async (next, cancel) => {
      if (opacity > 0) {
        await next({ display });
        await next({ opacity });
        return;
      }

      await next({ opacity });
      await next({ display });
    },
  });

  return [style, set];
}
