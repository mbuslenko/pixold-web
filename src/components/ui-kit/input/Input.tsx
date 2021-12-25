import React, { useState } from 'react';
import { IInputProps } from '../interfaces';
import { InputStatus } from '../type';
import styles from './Input.module.scss';

export const Input: React.FC<IInputProps> = ({ type, placeholder, description, status, onInput }) => {
  const [inputStatus, changeInputStatus] = useState<InputStatus>(status);
  const onInputCallback = (e: React.FormEvent<HTMLInputElement>): void => {
    onInput((e.target as HTMLInputElement).value);
    changeInputStatus('default');
  };

  return (
    <label className={`${styles['input-label']} ${styles[inputStatus] ?? ''}`}>
      <input
        className={`${styles.input} ${styles[inputStatus]}`}
        type={type}
        placeholder={placeholder}
        disabled={inputStatus === 'disabled'}
        onInput={onInputCallback}
      />
      <span className={styles.description}>
        {description}
      </span>
    </label>
  );
};
