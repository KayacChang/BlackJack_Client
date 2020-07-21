import React, { PropsWithChildren, HTMLAttributes, useState, ChangeEvent, useCallback } from 'react';
import styles from './Toggle.module.scss';

type Props = PropsWithChildren<HTMLAttributes<HTMLInputElement>>;

export default function Toggle({ id, onChange }: Props) {
  const [flag, setFlag] = useState(false);

  const handleChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>) {
      onChange && onChange(event);

      setFlag((flag) => !flag);
    },
    [onChange, setFlag]
  );

  return (
    <div className={styles.toggle}>
      <input type="checkbox" id={id} checked={flag} onChange={handleChange} />
      <label htmlFor={id}></label>
    </div>
  );
}
