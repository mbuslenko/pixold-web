import { MouseEventHandler } from 'react';
import { ElementPriority, InputStatus, InputType } from './type';

export interface IButtonProps {
  text: string;
  onClick?: MouseEventHandler;
  priority: ElementPriority;
  className?: string;
  disabled?: boolean;
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

export interface IModalPosition {
  x: number;
  y: number;
}

export interface IModalProps {
  heading: string;
  text: string;
  positionClassName?: string;
  colorsClassName?: string;
  sizeClassName?: string;
  position?: IModalPosition;
}
