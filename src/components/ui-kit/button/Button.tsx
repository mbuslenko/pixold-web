import { IButtonProps } from '../interfaces';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({ onClick, priority, text, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[priority]}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
