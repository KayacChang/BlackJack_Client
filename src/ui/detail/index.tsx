import React, { useCallback, useState } from 'react';
import { Home } from 'react-feather';
import { Button } from '../components/button/Button';
import styles from './Detail.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { currency } from '../../utils';
import { useSpring, animated } from 'react-spring';
import { Expo } from 'gsap';
import { useNavigate } from 'react-router-dom';
import services from '../../services';
import { times, identity } from 'ramda';

function Back() {
  const navTo = useNavigate();

  const onClick = useCallback(() => {
    services.leaveRoom();

    navTo(`${process.env.PUBLIC_URL}/lobby`, { replace: true });
  }, [navTo]);

  return (
    <Button className={styles.back} onClick={onClick}>
      <Home />
    </Button>
  );
}

type Props = {
  title: string;
  value: string;
};

function Field({ title, value }: Props) {
  const props = useSpring({
    to: [{ color: 'rgb(255, 159, 10)' }, { color: '#ffffff' }],
    config: { duration: 250, easing: Expo.easeInOut.easeInOut },
  });

  return (
    <div className={styles.field}>
      <h5>{title}</h5>
      <animated.span style={props}>{value}</animated.span>
    </div>
  );
}

function History() {
  const [isOpen, toggle] = useState(false);

  const onToggle = useCallback(() => {
    toggle((isOpen) => !isOpen);
  }, [toggle]);

  return (
    <div className={styles.history} onClick={onToggle}>
      <div className={styles.toggle}>
        <h5>History</h5>
      </div>

      {isOpen && (
        <div className={styles.content}>
          {times(identity, 20).map((num) => (
            <div className={styles.record}>
              <h5>{String(num + 1).padStart(2, '0')}</h5>
              <h4>25</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RoomDetail() {
  const roomID = useSelector((state: AppState) => state.game.room);
  const roundID = useSelector((state: AppState) => state.game.round);
  const { max, min } = useSelector((state: AppState) => state.game.bet);

  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <Back />
        <Field title={'room'} value={String(roomID)} />
        <Field title={'round'} value={roundID} />
        <Field title={'bet'} value={`${currency(min)} - ${currency(max)}`} />
      </div>

      <History />
    </div>
  );
}
