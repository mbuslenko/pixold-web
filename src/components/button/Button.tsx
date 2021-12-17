import React from 'react';
import { IButton } from '../../interfaces';
import './Button.scss';

const Button: React.FC<IButton> = ({ styles, textContent, action, width, height }) => {
  return (
    <input
      className={`primary${styles}`}
      type="button"
      value={textContent}
      onClick={action}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default Button;
