import { Color } from '../../shared/ts/enums';

import { CheckmarkSvgProps } from '../types';

export const CheckmarkSvg: React.FC<CheckmarkSvgProps> = ({ color, className }) => {
  const strokeColor: string = color === 'white' ? Color.WHITE : Color.PURPLE;

  return (
    <svg
      className={className}
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 5L5 9L13 1" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
