import { IRadioButtonGroupProps } from '../interfaces';
import { RadioButton } from '../radioButton/RadioButton';

export const RadioButtonGroup: React.FC<IRadioButtonGroupProps> = ({ priority, name, options, onChange }) => {
  return (
    <>
      {options.map(({ text, value, checked }, i) => (
        <RadioButton
          priority={priority}
          name={name}
          text={text}
          value={value}
          checked={checked}
          key={i}
          onChange={(value) => onChange(value)}
        />
      ))}
    </>
  );
};
