import { useState } from 'react';
import { ICheckboxProps } from '../interfaces';
import styles from './Toggle.module.scss';

export const Toggle: React.FC<ICheckboxProps> = ({ text, value, priority, className, checked, onChange }) => {
  const [isChecked, changeCheckedStatus] = useState<boolean>(checked ?? false);

  const onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeCheckedStatus(e.target.checked);
    onChange(e.target.checked);
  };

  return (
    <div className={`${styles['toggle-container']} ${className ?? ''}`}>
      <label className={styles['toggle-label']}>
        <input
          type="checkbox"
          className={`${styles.toggle} ${styles[priority]}`}
          value={value}
          checked={checked}
          onChange={onChangeCallback}
        />
        <span className={`${styles['toggle-slider']} ${styles[priority]} ${isChecked ? styles.checked : ''}`} />
      </label>
      <span className={`${styles['toggle-description']} ${styles[priority]}`}>{text}</span>
    </div>
  );
};
