import React, { FC, useState } from 'react';
import { ICheckbox } from '../../interfaces';
import './Checkbox.scss';

const Checkbox: FC<ICheckbox> = ({ className, textContent, value, onChange }) => {
  // const [checked, setChecked] = useState<boolean>(false);

  // const handleChange = () => {
  //   setChecked(!checked);
  // };
  return (
    <label className={`checkbox-label-${className}`}>
      <input type="checkbox" checked={value} onChange={onChange} className={`checkbox-input-${className}`} />
      <span className={`checkbox-text-${className}`}>{textContent}</span>
    </label>
  );
};

export default Checkbox;
