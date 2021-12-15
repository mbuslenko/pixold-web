import { ButtonStyles, RadioBtnStyles } from './enums';

export interface IButton {
  textContent: string;
  styles: ButtonStyles;
  action: () => void;
}

export interface IRadioBtn {
  textContent: string | number;
  className: RadioBtnStyles;
  /*  action: () => void; */
}
