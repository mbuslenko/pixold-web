import React, { FC } from 'react';
import { IToggle } from '../../interfaces';
import './Toggle.scss';

const Toggle: FC<IToggle> = ({ className, value, onChange, textContent }) => {
  return (
    <label className={`toggle-label-${className}`}>
      <input type="checkbox" className={`toggle-input-${className}`} checked={value} onChange={onChange} />
      <span className={`toggle-text-${className}`}>{textContent}</span>
    </label>
  );
};

export default Toggle;
