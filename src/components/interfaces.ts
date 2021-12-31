import { MouseEventHandler } from 'react';

import {
  AlertType,
  ButtonTheme,
  ElementPriority,
  InputStatus,
  InputType,
  ModalPositionType,
  ModalTheme,
  PrimaryButtonTheme,
  SecondaryButtonTheme,
} from './type';

export interface IButtonAppearance<P extends ElementPriority, T extends ButtonTheme> {
  priority: P;
  theme?: T;
}

export interface IButtonProps {
  text: string;
  appearance: IButtonAppearance<'primary', PrimaryButtonTheme> |
              IButtonAppearance<'secondary', SecondaryButtonTheme>;
  addedClasses?: string;
  disabled?: boolean;
  disabledPopup?: string;
  onClick?: MouseEventHandler;
}

export interface IRadioButtonProps {
  text: string;
  priority: ElementPriority;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void
}

export interface IRadioButtonGroupOption {
  text: string;
  value: string;
  checked?: boolean;
}

export interface IRadioButtonGroupProps {
  priority: ElementPriority;
  name: string;
  options: IRadioButtonGroupOption[];
  onChange: (value: string) => void;
}

export interface ICheckboxProps {
  text: string;
  priority: ElementPriority;
  value: string;
  checked?: boolean;
  onChange: (isChecked: boolean) => void;
}

export interface IInputProps {
  type: InputType;
  placeholder: string;
  description: string;
  status?: InputStatus;
  disabledPopup?: string;
  onInput: (text: string, status: InputStatus | undefined) => void;
}

export interface IDropdownOption {
  text: string;
  value: string;
}

export interface IDropdownProps {
  placeholder: string;
  options: IDropdownOption[]
  disabled?: boolean;
  disabledPopup?: string;
  onChange: (value: string) => void
}

export interface ITabbedButtonGroupOption {
  text: string;
  value: string;
}

export interface ITabbedButtonGroupProps {
  name: string;
  options: ITabbedButtonGroupOption[];
  onChange: (value: string) => void;
}

export interface IAlertProps {
  type: AlertType;
  heading: string;
  text?: string;
  onClick?: () => void;
}

export interface IModalPosition {
  left: string;
  top: string;
}

export interface IModalProps {
  heading: string;
  text: string;
  positionType?: ModalPositionType;
  position?: IModalPosition;
  theme?: ModalTheme;
  addedClasses?: string;
}
