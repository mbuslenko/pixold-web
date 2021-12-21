import React, { MouseEventHandler } from 'react';
import { ElementPriority, InputStatus, InputType } from './type';

// #TODO: unite colorStyle with priority interfaces
export interface IButtonPrimaryColorStyle {
  color: string;
  backgroundColor: string;
}

export interface IButtonSecondaryColorStyle {
  color: string;
  backgroundColor: string;
  borderColor: string;
}

export interface IButtonProps {
  text: string;
  priority: ElementPriority;
  onClick: MouseEventHandler;
  disabled?: boolean;
  colorStyle?: IButtonPrimaryColorStyle | IButtonSecondaryColorStyle;
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
  onInput: (text: string) => void;
  status: InputStatus;
}

export interface IDropdownOption {
  text: string;
  value: string;
}

export interface IDropdownProps {
  placeholder: string;
  options: IDropdownOption[]
  disabled?: boolean;
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
  type: 'blue' | 'yellow' | 'red' | 'green' | 'gray';
  heading: string;
  text?: string;
  onClick: () => void;
}

// TODO: add position
export interface IPosition {
  x: number;
  y: number;
}

// TODO: add styles to modal, z-index, size (width, height)

export interface IModalProps {
  heading: string;
  text: string;
  position?: IPosition;
  buttons?: React.FC;
}
