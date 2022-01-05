import { useState } from 'react';
import { IDropdownProps } from '../interfaces';
import styles from './Dropdown.module.scss';

export const Dropdown: React.FC<IDropdownProps> = ({
  placeholder,
  options,
  disabled,
  disabledPopup,
  onChange,
}) => {
  const [isOpen, changeOpenState] = useState<boolean>(false);
  const [selectedOption, changeSelectedOption] = useState<string>(placeholder);
  const dropdownPopup: string | undefined = (disabled && disabledPopup) ? disabledPopup : undefined;

  const changeOptionCallback = (text: string, value: string): void => {
    if (disabled) {
      return;
    }

    changeSelectedOption(text);
    changeOpenState(!isOpen);
    onChange(value);
  };

  return (
    <div
      className={`${disabled && styles.disabled} ${styles['dropdown-container']}`}
      title={dropdownPopup}
    >
      <div
        className={`${disabled && styles.disabled} ${styles['selected-option']} ${isOpen && styles['is-open']}`}
        onClick={() => !disabled && changeOpenState(!isOpen)}
      >
        {selectedOption}
      </div>
      <div className={styles['option-list-wrapper']}>
        <div className={`${isOpen && styles['is-open']} ${styles['option-list']}`}>
          {options.map(({ text, value }, i) => (
            <button
              key={i}
              className={styles.option}
              onClick={() => changeOptionCallback(text, value)}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
