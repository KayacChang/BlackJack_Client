import { useState } from 'react';
import usePagination from '../pagination';
import { useTransition } from 'react-spring';

export default function useCarousel<T>(source: T[], itemsPerPage: number) {
  const [isNext, setNext] = useState(true);
  const { data, page, range, next, prev } = usePagination(source, itemsPerPage);

  const transitions = useTransition(page, {
    from: { opacity: 0, transform: isNext ? `translate3d(100%,0,0)` : `translate3d(-100%,0,0)` },
    enter: { opacity: 1, transform: `translate3d(0%,0,0)` },
    leave: { opacity: 0, transform: isNext ? `translate3d(-100%,0,0)` : `translate3d(100%,0,0)` },
  });

  return {
    data,
    page,
    range,
    transitions,
    next: () => {
      next();

      setNext(true);
    },
    prev: () => {
      prev();

      setNext(false);
    },
  };
}
