import { useEffect, useRef, useState } from 'react';

import styles from './AlertContainer.module.scss';
import { IAlertContainerProps } from '../interfaces';
import { AlertInfo } from '../types';
import { Alert } from '../alert/Alert';
import { client } from '../../shared/ts/ClientCommunication';

export const AlertContainer: React.FC<IAlertContainerProps> = ({ isConnectedSocket, showAttackAlerts }) => {
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
        callback: ({ type, message }) => {
          setAlertAll([{ type, heading: message, date: new Date() }, ...alertAll]);
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

  return (
    <article className={styles.container} ref={alertContainer}>
      {infoAlertAll.map((value, index) => (
        <Alert {...value} key={`info-${index}`} closeAlertCallback={closeInfoAlertCallback(index)} />
      ))}
      {alertAll.map((value, index) => (
        <Alert {...value} key={`alert-${index}`} closeAlertCallback={closeAttackAlertCallback(index)} />
      ))}
    </article>
  );
};
