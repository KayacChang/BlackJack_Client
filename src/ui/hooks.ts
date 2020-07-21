import { useState, useEffect } from 'react';

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
