import React from 'react';
import { IModalProps } from '../interfaces';
import styles from './Modal.module.scss';

export const Modal: React.FC<IModalProps> = ({
  heading,
  text,
  children,
  positionType,
  position,
  theme,
  addedClasses,
}) => {
  const modalTheme: string = theme ? styles[theme] : styles['default-colors'];
  const modalStyle = {
    position: positionType,
    ...position,
  };

  return (
    <div
      style={modalStyle}
      className={`${styles.container} ${modalTheme} ${addedClasses ?? ''}`}
    >
      <h2 className={styles.heading}>
        {heading}
      </h2>
      <p className={styles.text}>
        {text}
      </p>
      {children &&
        <div className={styles['button-container']}>
          {React.Children.map(children, (value, index) =>
            <div
              className={styles['button-wrapper']}
              key={index}
            >
              {value}
            </div>,
          )}
        </div>
      }
    </div>
  );
};
