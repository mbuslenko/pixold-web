import React, { FC } from 'react';
import { IButton } from '../../interfaces';
import './Button.scss';

const Button: FC<IButton> = ({ styles, textContent, action }) => {
  return <input className={`primary${styles}`} type="button" value={textContent} onClick={action} />;
};

export default Button;
