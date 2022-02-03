import { useEffect, useState } from 'react';
import { ITabbedButtonGroupProps } from '../interfaces';
import styles from './TabbedButtonGroup.module.scss';

// TODO: set highlight on selected input even if disabled
export const TabbedButtonGroup: React.FC<ITabbedButtonGroupProps> = ({ name, disabled, value, options, onChange }) => {
  const [inputValue, setInputValue] = useState<string>();

  useEffect(() => {
    if (value) {
      setInputValue(value);
      onChange(value);
    }
  }, [onChange, value]);

  return (
    <div className={styles.container}>
      {options.map(({ text, value }, i) => (
        <label key={i} className={`${styles.label} ${disabled ? styles.disabled : ''}`}>
          <input
            type="radio"
            name={name}
            value={value}
            disabled={disabled}
            checked={inputValue === value}
            onChange={() => {
              setInputValue(value);
              onChange(value);
            }}
            className={styles.input}
          />
          <span className={styles.description}>{text}</span>
        </label>
      ))}
    </div>
  );
};
