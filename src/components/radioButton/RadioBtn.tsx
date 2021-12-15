import React, { FC, useState } from 'react';
import { IRadioBtn } from '../../interfaces';
import './RadioBtn.scss';

const RadioBtn: FC<IRadioBtn> = ({ className, textContent }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(() => !isChecked);
  };

  return (
    <>
      <label className={`form-control-${className}`}>
        <input
          type="radio"
          name="radio"
          className={`radio-input-${className}`}
          checked={isChecked}
          onChange={toggleCheck}
        />
        <span className={`radio-text-${className}`}>{textContent}</span>
      </label>
    </>
  );
};

export default RadioBtn;
