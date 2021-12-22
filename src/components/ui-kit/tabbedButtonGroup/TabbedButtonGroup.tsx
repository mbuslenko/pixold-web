import { ITabbedButtonGroupProps } from '../interfaces';
import styles from './TabbedButtonGroup.module.scss';

export const TabbedButtonGroup: React.FC<ITabbedButtonGroupProps> = ({ name, options, onChange }) => {
  return (
    <div className={styles.container}>
      {options.map(({ text, value }, i) => (
        <label
          key={i}
          className={styles.label}
        >
          <input
            type='radio'
            name={name}
            value={value}
            onChange={() => onChange(value)}
            className={styles.input}
          />
          <span className={styles.description}>
            {text}
          </span>
        </label>
      ))}
    </div>
  );
};
