import { ButtonStyles, InputsStyles } from './enums';

export interface IButton {
  textContent: string;
  styles: ButtonStyles;
  action: () => void;
}

export interface IRadioBtn {
  textContent: string | number;
  className: InputsStyles;
  /*  action: () => void; */
}

export interface ICheckbox {
  className: InputsStyles;
  textContent: string | number;
  value: boolean;
  onChange: () => void;
}
