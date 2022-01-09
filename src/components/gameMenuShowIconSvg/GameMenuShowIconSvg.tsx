import { Color } from '../../shared/ts/enums';
import { GameMenuShowSvgProps } from '../types';

export const GameMenuShowIconSvg: React.FC<GameMenuShowSvgProps> = ({ color, className }) => {
  const fillColor = color === 'purple' ? Color.PURPLE : Color.WHITE;

  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.53999 0H5.91998C7.32997 0 8.45997 1.15002 8.45997 2.56104V5.97009C8.45997 7.39011 7.32997 8.53013 5.91998 8.53013H2.53999C1.14 8.53013 0 7.39011 0 5.97009V2.56104C0 1.15002 1.14 0 2.53999 0Z"
        fill={fillColor}
      />
      <path
        d="M2.53999 11.4699H5.91998C7.32997 11.4699 8.45997 12.6109 8.45997 14.0309V17.44C8.45997 18.85 7.32997 20 5.91998 20H2.53999C1.14 20 0 18.85 0 17.44V14.0309C0 12.6109 1.14 11.4699 2.53999 11.4699Z"
        fill={fillColor}
      />
      <path
        d="M17.46 0H14.0801C12.6701 0 11.54 1.15002 11.54 2.56104V5.97009C11.54 7.39011 12.6701 8.53013 14.0801 8.53013H17.46C18.86 8.53013 20 7.39011 20 5.97009V2.56104C20 1.15002 18.86 0 17.46 0Z"
        fill={fillColor}
      />
      <path
        d="M14.0801 11.4699H17.46C18.86 11.4699 20 12.6109 20 14.0309V17.44C20 18.85 18.86 20 17.46 20H14.0801C12.6701 20 11.54 18.85 11.54 17.44V14.0309C11.54 12.6109 12.6701 11.4699 14.0801 11.4699Z"
        fill={fillColor}
      />
    </svg>
  );
};
