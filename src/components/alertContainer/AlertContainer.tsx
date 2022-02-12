import { useEffect, useRef, useState } from 'react';

import styles from './AlertContainer.module.scss';
import { Alert } from '../alert/Alert';
import { Button } from '../button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlertAll, removeAlert, removeInfoAlert } from '../../store/alertSlice';
import { RootState } from '../../store/types';

export const AlertContainer: React.FC = () => {
  console.log('AlertContainer render');
  const dispatch = useDispatch();

  const { infoAlertAll, alertAll } = useSelector((state: RootState) => state.alert);

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
      {alertLength > 5 && (
        <div className={styles['button-container']}>
          <Button
            text={showAlertButtonText}
            appearance={{ priority: 'primary', theme: 'black-white' }}
            onClick={() => setIsVisibleContainer(!isVisibleContainer)}
            className={styles['show-button']}
          />
          <Button text="Clear" onClick={clearAlertAll} appearance={{ priority: 'secondary', theme: 'black-white' }} />
        </div>
      )}
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
    </article>
  );
};
