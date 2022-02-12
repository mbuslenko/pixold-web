import styles from './Alert.module.scss';
import closeSvg from '../../assets/svg/close-icon.svg';
import { IAlertProps } from '../interfaces';

export const Alert: React.FC<IAlertProps> = ({ type, heading, text, date, closeAlertCallback }) => {
  const formatAMPM = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${hours === 0 ? 12 : hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
  };

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {type === 'info' && (
        <div className={`${styles['info-wrapper']}`}>
          <h3 className={styles['info-title']}>Info</h3>
          <img className={styles['close-icon']} src={closeSvg} alt="Close" onClick={closeAlertCallback} />
        </div>
      )}
      <div className={`${styles['heading-wrapper']}`}>
        <h2 className={styles.heading}>{heading}</h2>
        {type !== 'info' && (
          <img className={styles['close-icon']} src={closeSvg} alt="Close" onClick={closeAlertCallback} />
        )}
      </div>
      {text && <p className={styles.text}>{text}</p>}
      <p className={styles.time}>{`Today ${formatAMPM(date)}`}</p>
    </div>
  );
};
