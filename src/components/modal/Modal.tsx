import React from 'react';
import { IModalProps } from '../interfaces';
import styles from './Modal.module.scss';

export const Modal: React.FC<IModalProps> = ({ heading, text, children, positionType, position, theme, className }) => {
  const modalClassName: string = className ?? '';
  const modalTheme: string = theme ? styles[theme] : styles['default-colors'];
  const modalStyle = {
    position: positionType,
    ...position,
  };

  return (
    <div style={modalStyle} className={`${styles.container} ${modalTheme} ${modalClassName}`}>
      <h2 className={styles.heading}>{heading}</h2>
      {text && <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />}
      {children && <div className={styles['button-container']}>{children}</div>}
    </div>
  );
};
