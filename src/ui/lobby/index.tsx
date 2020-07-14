import React, { PropsWithChildren, HTMLAttributes, useState, CSSProperties, useCallback, useEffect } from 'react';
import styles from './Lobby.module.scss';
import BG from './assets/background.jpg';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import useCarousel from '../components/carousel';
import Room from './Room';
import ARROW from './assets/arrow.png';
import clsx from 'clsx';
import { animated, useSpring } from 'react-spring';
import { Room as Model } from '../../models';

type ArrowProps = {
  reverse?: boolean;
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function Arrow({ style, reverse = false, onClick }: ArrowProps) {
  return (
    <div className={styles.control} style={style} onClick={onClick}>
      <img className={clsx(reverse && styles.reverse)} src={ARROW} alt={ARROW} />
    </div>
  );
}

type RoomButtonProps = {
  data: Model;
  style: CSSProperties;
  onClick: () => void;
};

function RoomButton({ style, data, onClick }: RoomButtonProps) {
  const props = useSpring(style);

  return (
    <animated.div className={styles.room} style={props} onClick={onClick}>
      <Room data={data} />
    </animated.div>
  );
}

function toStyle(left: number, top: number, scale: number) {
  return {
    left: `${left}%`,
    top: `${top}%`,
    transform: `translate(-50%, -50%) scale(${scale})`,
  };
}

const origin = [
  { left: 30, top: 35, scale: 1 },
  { left: 70, top: 35, scale: 1 },
  { left: 30, top: 75, scale: 1 },
  { left: 70, top: 75, scale: 1 },
];

export default function Lobby() {
  const room = useSelector((state: AppState) => state.room);
  const { data, page, range, transitions, next, prev, bind } = useCarousel(room, 4);

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
        left: left + (left - focus.left) * 1.3,
        top: top + (top - focus.top) * 1.3,
        scale: 1.3,
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
    <div className={styles.lobby} onClick={cancelFocus} style={{ pointerEvents: focus ? 'all' : 'none' }} {...bind()}>
      <div>
        <img className={styles.background} src={BG} alt={BG} />

        {transitions((prop) => (
          <animated.div className={styles.rooms} style={prop}>
            {config.map(({ left, top, scale }, index) => (
              <RoomButton
                key={String(index)}
                style={toStyle(left, top, scale)}
                data={data[index]}
                onClick={() => onClick(index)}
              />
            ))}
          </animated.div>
        ))}

        <div>
          {page > range.min && <Arrow style={{ left: `${7}%`, top: `${50}%` }} onClick={prev} />}

          {page < range.max && <Arrow reverse={true} style={{ left: `${93}%`, top: `${50}%` }} onClick={next} />}
        </div>
      </div>
    </div>
  );
}
