import React from 'react';
import { IModalProps } from '../interfaces';
import styles from './Modal.module.scss';

export const Modal: React.FC<IModalProps> = ({
  sizeClassName,
  colorsClassName,
  positionClassName,
  position,
  heading,
  text,
  children,
}) => {
  return (
    <div
      style={position && { left: `${position.x}px`, top: `${position.y}px` }}
      className={`${styles.container} ${sizeClassName ?? styles['default-size']} ${positionClassName ?? ''} ${
        colorsClassName ?? styles['default-colors']
      }`}
    >
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.text}>{text}</p>
      {children && (
        <div className={styles['button-container']}>
          {React.Children.map(children, (value, index) => (
            <div className={styles['button-wrapper']} key={index}>
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
