import { useEffect } from 'react';

import styles from './Alert.module.scss';
import closeSvg from '../../assets/svg/close-icon.svg';
import { IAlertProps } from '../interfaces';

export const Alert: React.FC<IAlertProps> = ({ type, heading, text, closeAlertCallback }) => {
  const formatAMPM = () => {
    const date = new Date();
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    let time = '';

    time += (hours ? hours : 12) + ':';
    time += minutes < 10 ? '0' + minutes : minutes;
    time += ampm;

    return time;
  };

  useEffect(() => {
    const timer = setTimeout(closeAlertCallback, 7000);

    return () => clearTimeout(timer);
  }, [closeAlertCallback]);

  return (
    <div className={`${styles.container} ${styles[type]}`}>
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
      <p className={styles.time}>{`Today ${formatAMPM()}`}</p>
    </div>
  );
};
