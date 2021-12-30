import { IRadioButtonProps } from '../interfaces';
import styles from './RadioButton.module.scss';

export const RadioButton: React.FC<IRadioButtonProps> = ({ text, priority, name, value, checked, onChange }) => {
  return (
    <label className={styles['radio-label']}>
      <input
        type='radio'
        name={name}
        value={value}
        className={`${styles.radio} ${styles[priority]}`}
        defaultChecked={checked}
        onChange={() => onChange(value)}
      />
      <span className={`${styles['radio-description']} ${styles[priority]}`}>
        {text}
      </span>
    </label>
  );
};
