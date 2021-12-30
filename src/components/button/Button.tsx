import { IButtonProps } from '../interfaces';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({
  text,
  appearance: { priority, theme },
  addedClasses,
  disabled,
  onClick,
}) => {
  const buttonTheme: string = theme ? styles[theme] : styles.default;
  const classNames: string = addedClasses ?? '';

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[priority]} ${buttonTheme} ${classNames}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
