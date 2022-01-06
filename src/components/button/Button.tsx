import { IButtonProps } from '../interfaces';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({
  text,
  appearance: { priority, theme },
  className,
  disabled,
  disabledPopup,
  onClick,
}) => {
  const buttonTheme: string = theme ? styles[theme] : styles.default;
  const buttonPopup: string | undefined = disabled && disabledPopup ? disabledPopup : undefined;
  const buttonClassName: string = className ?? '';

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[priority]} ${buttonTheme} ${buttonClassName}`}
      disabled={disabled}
      title={buttonPopup}
    >
      {text}
    </button>
  );
};
