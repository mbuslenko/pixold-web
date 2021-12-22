import { IButtonProps } from '../interfaces';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({ onClick, priority, className, text, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[priority]} ${className ?? styles['default-style']}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
