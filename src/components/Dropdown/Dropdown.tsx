import React, { FC, useState } from 'react';
import { IDropdown, IItem } from '../../interfaces';
import './Dropdown.scss';

//If disabled, need add class disabled

const Dropdown: FC<IDropdown> = ({ title, items, value, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="dropdown">
      <div className="control" onClick={() => setOpen((prev) => !prev)}>
        <div className="selected-value">{value ? value : title}</div>
        <div className={`arrow ${open ? 'open' : null}`}></div>
      </div>
      <div className={`options ${open ? 'open' : null}`}>
        {items.map((item: IItem) => (
          <div
            className={`option ${value === item.name ? 'selected' : null}`}
            onClick={() => {
              onChange(item.name);
              setOpen(false);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
