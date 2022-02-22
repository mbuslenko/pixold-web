import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { clearAlertAll, removeAlert, removeInfoAlert } from '../../store/alertSlice';
import { useAppSelector } from '../../store/store';

import { Alert } from '../alert/Alert';
import { Button } from '../button/Button';

import styles from './AlertContainer.module.scss';

export const AlertContainer: React.FC = () => {
  console.log('AlertContainer render');
  const dispatch = useDispatch();

  const { infoAlertAll, alertAll } = useAppSelector((state) => state.alert);

  const alertContainer = useRef<HTMLDivElement>(null);

  const [isVisibleContainer, setIsVisibleContainer] = useState(true);

  const alertLength = infoAlertAll.length + alertAll.length;
  const showAlertButtonText = `${isVisibleContainer ? 'Hide' : 'Show'} alerts (${alertLength}${
    infoAlertAll.length !== 0 ? '!' : ''
  })`;

  useEffect(() => {
    if (alertContainer.current) {
      alertContainer.current.onwheel = (e) => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      };
    }
  }, []);

  return (
    <article className={styles.container} ref={alertContainer}>
      {(alertLength <= 5 || isVisibleContainer) && [
        infoAlertAll.map((value, index) => (
          <Alert
            type="info"
            {...value}
            key={`info-${index}`}
            closeAlertCallback={() => dispatch(removeInfoAlert(index))}
          />
        )),
        alertAll.map((value, index) => (
          <Alert {...value} key={`alert-${index}`} closeAlertCallback={() => dispatch(removeAlert(index))} />
        )),
      ]}
      {alertLength > 5 && (
        <div className={styles['button-container']}>
          <Button
            text={showAlertButtonText}
            appearance={{ priority: 'primary', theme: 'black-white' }}
            className={styles['show-button']}
            onClick={() => setIsVisibleContainer(!isVisibleContainer)}
          />
          <Button
            text="Clear"
            appearance={{ priority: 'secondary', theme: 'black-white' }}
            className={styles['clear-button']}
            onClick={() => dispatch(clearAlertAll())}
          />
        </div>
      )}
    </article>
  );
};
