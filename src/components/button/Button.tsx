import { IButtonProps } from '../interfaces';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({
  text,
  appearance: { priority, theme },
  addedClasses,
  disabled,
  disabledPopup,
  onClick,
}) => {
  const buttonTheme: string = theme ? styles[theme] : styles.default;
  const buttonPopup: string | undefined = (disabled && disabledPopup) ? disabledPopup : undefined;
  const classNames: string = addedClasses ?? '';

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[priority]} ${buttonTheme} ${classNames}`}
      disabled={disabled}
      title={buttonPopup}
    >
      {text}
    </button>
  );
};
