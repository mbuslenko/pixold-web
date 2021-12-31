import React, { useEffect, useState } from 'react';
import { IInputProps } from '../interfaces';
import { InputStatus } from '../type';
import styles from './Input.module.scss';

export const Input: React.FC<IInputProps> = ({
  type,
  placeholder,
  description,
  status,
  disabledPopup,
  onInput,
}) => {
  const [inputStatus, changeInputStatus] = useState<InputStatus>();
  const inputPopup: string | undefined = (status === 'disabled' && disabledPopup) ? disabledPopup : undefined;

  const onInputCallback = (e: React.FormEvent<HTMLInputElement>): void => {
    changeInputStatus(undefined);
    onInput((e.target as HTMLInputElement).value, undefined);
  };

  useEffect(
    () => {
      changeInputStatus(status);
    },
    [status],
  );

  return (
    <label
      title={inputPopup}
      className={`${styles['input-label']} ${inputStatus && styles[inputStatus]}`}
    >
      <div className={`${styles['input-wrapper']} ${inputStatus && styles[inputStatus]}`}>
        <input
          className={`${styles.input} ${inputStatus && styles[inputStatus]}`}
          type={type}
          placeholder={placeholder}
          disabled={inputStatus === 'disabled'}
          onInput={onInputCallback}
        />
      </div>
      <span className={styles.description}>
        {description}
      </span>
    </label>
  );
};
