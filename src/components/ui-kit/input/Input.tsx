import React, { useEffect, useState } from 'react';
import { IInputProps } from '../interfaces';
import { InputStatus } from '../type';
import styles from './Input.module.scss';

export const Input: React.FC<IInputProps> = ({
  type,
  placeholder,
  description,
  status,
  onInputCallback,
}) => {
  const [inputStatus, changeInputStatus] = useState<InputStatus>();
  const onInput = (e: React.FormEvent<HTMLInputElement>): void => {
    changeInputStatus(undefined);
    onInputCallback((e.target as HTMLInputElement).value, undefined);
  };

  useEffect(
    () => {
      changeInputStatus(status);
    },
    [status],
  );

  return (
    <label className={`${styles['input-label']} ${inputStatus && styles[inputStatus]}`}>
      <input
        className={`${styles.input} ${inputStatus && styles[inputStatus]}`}
        type={type}
        placeholder={placeholder}
        disabled={inputStatus === 'disabled'}
        onInput={onInput}
      />
      <span className={styles.description}>
        {description}
      </span>
    </label>
  );
};
