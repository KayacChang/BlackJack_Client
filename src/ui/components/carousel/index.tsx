import { useState, useCallback } from 'react';
import usePagination from '../pagination';
import { useTransition } from 'react-spring';
import { useDrag } from 'react-use-gesture';

export default function useCarousel<T>(source: T[], itemsPerPage: number) {
  const [isNext, setNext] = useState(true);
  const { data, page, range, next, prev } = usePagination(source, itemsPerPage);

  const [block, setBlock] = useState(false);

  const transitions = useTransition(page, {
    from: { opacity: 0, transform: isNext ? `translate3d(100%,0,0)` : `translate3d(-100%,0,0)` },
    enter: { opacity: 1, transform: `translate3d(0%,0,0)` },
    leave: { opacity: 0, transform: isNext ? `translate3d(-100%,0,0)` : `translate3d(100%,0,0)` },
    onStart: () => setBlock(true),
    onRest: () => setBlock(false),
  });

  const _next = useCallback(() => {
    if (block) return;
    setNext(true);

    next();
  }, [next, block]);

  const _prev = useCallback(() => {
    if (block) return;
    setNext(false);

    prev();
  }, [prev, block]);

  const bind = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir], velocity }) => {
    const trigger = Math.abs(mx) > 50;

    // console.log(down, mx, xDir);

    if (!down && trigger) {
      xDir < 0 ? _next() : _prev();
    }
  });

  return {
    data,
    page,
    range,
    transitions,
    bind,
    next: _next,
    prev: _prev,
  };
}
