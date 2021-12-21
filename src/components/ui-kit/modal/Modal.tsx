import React from 'react';
import { IModalProps } from '../interfaces';
import styles from './Modal.module.scss';

export const Modal: React.FC<IModalProps> = ({ position, heading, text, children }) => {
  return (
    <div
      style={position && { position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
      className={styles.container}
    >
      <h2 className={styles.heading}>
        {heading}
      </h2>
      <p className={styles.text}>
        {text}
      </p>
      {children &&
        <div className={styles['button-container']}>
          {React.Children.map(children, (v, i) =>
            <div
              className={styles['button-wrapper']}
              key={i}
            >
              {v}
            </div>
          )}
        </div>
      }
    </div>
  );
};
