import { useEffect, useRef, useState } from 'react';

import styles from './AlertContainer.module.scss';
import { IAlertContainerProps } from '../interfaces';
import { AlertInfo } from '../types';
import { Alert } from '../alert/Alert';
import { client } from '../../shared/ts/ClientCommunication';
import { Button } from '../button/Button';

export const AlertContainer: React.FC<IAlertContainerProps> = ({ isConnectedSocket, showAttackAlerts }) => {
  const [isVisibleContainer, setIsVisibleContainer] = useState(true);
  const [infoAlertAll, setInfoAlertAll] = useState<AlertInfo[]>([]);
  const [alertAll, setAlertAll] = useState<AlertInfo[]>([]);
  const alertContainer = useRef<HTMLDivElement>(null);

  if (alertContainer.current) {
    alertContainer.current.onwheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
  }

  if (isConnectedSocket) {
    client.onEvent({
      event: 'info',
      callback: ({ title, body }) => {
        setInfoAlertAll([{ type: 'info', heading: title, text: body, date: new Date() }, ...infoAlertAll]);
      },
    });
    if (showAttackAlerts) {
      client.onEvent({
        event: 'attack',
        callback: ({ to, type, message }) => {
          if (to === localStorage.getItem('userId')) {
            setAlertAll([{ type, heading: message, date: new Date() }, ...alertAll]);
          }
        },
      });
    }
  } else {
    client.removeEventListenerAll('info');
    client.removeEventListenerAll('attack');
  }

  client.onRequestError = (message) => {
    setAlertAll([{ type: 'error', heading: message, date: new Date() }, ...alertAll]);
  };

  client.requestResponseCallback = (message) => {
    setAlertAll([{ type: 'success', heading: message, date: new Date() }, ...alertAll]);
  };

  const closeInfoAlertCallback = (index: number) => () =>
    setInfoAlertAll([...infoAlertAll.slice(0, index), ...infoAlertAll.slice(index + 1)]);

  const closeAttackAlertCallback = (index: number) => () =>
    setAlertAll([...alertAll.slice(0, index), ...alertAll.slice(index + 1)]);

  useEffect(() => {
    if (!isConnectedSocket) {
      setInfoAlertAll([]);
      setAlertAll([]);
    }
  }, [isConnectedSocket]);

  const alertLength = infoAlertAll.length + alertAll.length;

  return (
    <article className={styles.container} ref={alertContainer}>
      {alertLength > 5 && (
        <div className={styles['button-container']}>
          <Button
            text={`${isVisibleContainer ? 'Hide' : 'Show'} alerts (${alertLength}${infoAlertAll.length !== 0 ? '!' : ''})`}
            appearance={{ priority: 'primary', theme: 'black-white' }}
            onClick={() => setIsVisibleContainer(!isVisibleContainer)}
            className={styles['show-button']}
          />
          <Button
            text="Clear"
            onClick={() => {
              setInfoAlertAll([]);
              setAlertAll([]);
            }}
            appearance={{ priority: 'secondary', theme: 'black-white' }}
          />
        </div>
      )}
      {(alertLength <= 5 || isVisibleContainer) && [
        infoAlertAll.map((value, index) => (
          <Alert {...value} key={`info-${index}`} closeAlertCallback={closeInfoAlertCallback(index)} />
        )),
        alertAll.map((value, index) => (
          <Alert {...value} key={`alert-${index}`} closeAlertCallback={closeAttackAlertCallback(index)} />
        )),
      ]}
    </article>
  );
};
