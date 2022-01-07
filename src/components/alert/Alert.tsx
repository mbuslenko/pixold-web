import { IAlertProps } from '../interfaces';
import styles from './Alert.module.scss';

export const Alert: React.FC<IAlertProps> = ({ type, heading, text, onClick }) => {
  return (
    <div className={`${styles.container} ${styles[type]}`} onClick={onClick}>
      <h2 className={styles.heading}>{heading}</h2>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};
