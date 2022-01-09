import styles from './Button.module.scss';
import { IButtonProps } from '../interfaces';
import { OpenseaLogoSvg } from '../openseaLogoSvg/OpenseaLogoSvg';

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
  let iconComponent: JSX.Element | undefined;

  switch (theme) {
    case 'opensea-white':
      iconComponent = <OpenseaLogoSvg color="white" className={styles['opensea-logo']} />;
      break;
    case 'opensea-black':
      iconComponent = <OpenseaLogoSvg color="black" className={styles['opensea-logo']} />;
      break;
    default:
      iconComponent = undefined;
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[priority]} ${buttonTheme} ${buttonClassName}`}
      disabled={disabled}
      title={buttonPopup}
    >
      {iconComponent}
      {text}
    </button>
  );
};
