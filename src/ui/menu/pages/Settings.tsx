import React, { ChangeEvent, useCallback } from 'react';
import styles from './Settings.module.scss';
import { VolumeX, Volume2 } from 'react-feather';
import { Slider, Toggle } from '../../components/input';
import { useSoundState, change } from '../../../sound';

type Props = {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
function Volume({ value, onChange }: Props) {
  return (
    <div className={styles.volume}>
      <VolumeX color="white" />
      <Slider className={styles.slider} value={value} onChange={onChange} />
      <Volume2 color="white" />
    </div>
  );
}

export default function Settings() {
  const { state, dispatch } = useSoundState();

  const onVolumeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => dispatch(change({ volumn: Number(event.target.value) })),
    [dispatch]
  );
  const onToggleSFX = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => dispatch(change({ canPlaySFX: event.target.checked })),
    [dispatch]
  );
  const onToggleBGM = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => dispatch(change({ canPlayBGM: event.target.checked })),
    [dispatch]
  );

  return (
    <div className={styles.settings}>
      <section>
        <div>
          <h3>audio</h3>
        </div>

        <div>
          <h4>volume</h4>
          <Volume value={state.volumn} onChange={onVolumeChange} />
        </div>

        <div className={styles.toggle}>
          <h4>sound effects</h4>
          <Toggle id={'sound-effects'} value={state.canPlaySFX} onChange={onToggleSFX} />
        </div>

        <div className={styles.toggle}>
          <h4>ambience sound</h4>
          <Toggle id={'ambience-sound'} value={state.canPlayBGM} onChange={onToggleBGM} />
        </div>
      </section>
    </div>
  );
}
