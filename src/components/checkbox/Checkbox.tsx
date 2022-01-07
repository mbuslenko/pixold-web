import { ICheckboxProps } from '../interfaces';
import styles from './Checkbox.module.scss';

export const Checkbox: React.FC<ICheckboxProps> = ({ text, priority, value, checked, onChange }) => {
  return (
    <label className={styles['checkbox-label']}>
      <input
        className={`${styles.checkbox} ${styles[priority]}`}
        type="checkbox"
        value={value}
        defaultChecked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={`${styles['checkbox-description']} ${styles[priority]}`}>{text}</span>
    </label>
  );
};
