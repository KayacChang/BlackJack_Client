import React, { useState, useCallback, useEffect } from 'react';
import styles from './Lobby.module.scss';
import BG from './assets/background.jpg';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import useCarousel from '../components/carousel';
import Arrow from './Arrow';
import { animated } from 'react-spring';
import Room from './Room';

const origin = [
  { left: 30, top: 35, scale: 1 },
  { left: 70, top: 35, scale: 1 },
  { left: 30, top: 75, scale: 1 },
  { left: 70, top: 75, scale: 1 },
];

function toStyle(left: number, top: number, scale: number) {
  return {
    left: `${left}%`,
    top: `${top}%`,
    transform: `translate(-50%, -50%) scale(${scale})`,
  };
}

export default function Lobby() {
  const room = useSelector((state: AppState) => state.room);
  const { data, page, range, transitions, next, prev, gesture } = useCarousel(room, 4);

  const [focus, setFocus] = useState(false);
  const [config, setConfig] = useState(origin);

  const onClick = useCallback((target) => {
    const focus = { left: 50, top: 50, scale: 1.3 };

    const offset = {
      left: focus.left - origin[target].left,
      top: focus.top - origin[target].top,
    };

    const config = origin.map((style) => {
      const left = style.left + offset.left;
      const top = style.top + offset.top;

      return {
        left: left + (left - focus.left) * focus.scale,
        top: top + (top - focus.top) * focus.scale,
        scale: focus.scale,
      };
    });

    setConfig(config);
    setFocus(true);
  }, []);

  const cancelFocus = useCallback(() => {
    if (!focus) {
      return;
    }

    setConfig(origin);
    setFocus(false);
  }, [focus]);

  useEffect(cancelFocus, [page]);

  return (
    <div className={styles.lobby} {...gesture()}>
      <div>
        <img
          className={styles.background}
          src={BG}
          alt={BG}
          onClick={cancelFocus}
          style={{ pointerEvents: focus ? 'all' : 'none' }}
        />

        {transitions((prop) => (
          <animated.div className={styles.rooms} style={prop}>
            {config.map(({ left, top, scale }, index) => (
              <Room
                key={String(index)}
                style={toStyle(left, top, scale)}
                data={data[index]}
                onClick={() => onClick(index)}
              />
            ))}
          </animated.div>
        ))}

        <div>
          {page > range.min && (
            <Arrow style={{ left: `${7}%`, top: `${50}%` }} onClick={() => (focus ? cancelFocus() : prev())} />
          )}

          {page < range.max && (
            <Arrow
              reverse={true}
              style={{ left: `${93}%`, top: `${50}%` }}
              onClick={() => (focus ? cancelFocus() : next())}
            />
          )}
        </div>
      </div>
    </div>
  );
}
