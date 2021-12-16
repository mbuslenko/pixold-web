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

export interface IToggle {
  className: InputsStyles;
  value: boolean;
  onChange: () => void;
  textContent?: string | number;
}

export interface IItem {
  id: number;
  name: string;
}

export interface IDropdown {
  title: string;
  items: Array<IItem>;
  value: string;
  onChange: (item: string) => void;
}
