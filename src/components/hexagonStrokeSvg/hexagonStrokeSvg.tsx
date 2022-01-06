import { HexagonStrokeSvgProps } from '../types';

export const HexagonStrokeSvg: React.FC<HexagonStrokeSvgProps> = ({ color, className }) => {
  const strokeColor = color === 'purple' ? '#604AF7' : '#D63031';

  return (
    <svg
      className={className}
      width="181"
      height="199"
      viewBox="0 0 181 199"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.4038 51.0096L84.3359 12.0088C87.3582 10.2989 91.0512 10.2792 94.0916 11.9569L165.028 51.1008C168.217 52.8603 170.197 56.2143 170.197 59.8562V139.038C170.197 142.658 168.241 145.995 165.082 147.763L94.1471 187.482C91.0785 189.2 87.3327 189.18 84.2827 187.429L15.3492 147.854C12.2433 146.071 10.3281 142.763 10.3281 139.182L10.3281 59.7131C10.3281 56.1093 12.2672 52.7842 15.4038 51.0096Z"
        fill="#010010"
      />
      <path
        d="M15.4038 51.0096L84.3359 12.0088C87.3582 10.2989 91.0512 10.2792 94.0916 11.9569L165.028 51.1008C168.217 52.8603 170.197 56.2143 170.197 59.8562V139.038C170.197 142.658 168.241 145.995 165.082 147.763L94.1471 187.482C91.0785 189.2 87.3327 189.18 84.2827 187.429L15.3492 147.854C12.2433 146.071 10.3281 142.763 10.3281 139.182L10.3281 59.7131C10.3281 56.1093 12.2672 52.7842 15.4038 51.0096Z"
        fill="black"
        fill-opacity="0.2"
      />
      <path
        d="M15.4038 51.0096L84.3359 12.0088C87.3582 10.2989 91.0512 10.2792 94.0916 11.9569L165.028 51.1008C168.217 52.8603 170.197 56.2143 170.197 59.8562V139.038C170.197 142.658 168.241 145.995 165.082 147.763L94.1471 187.482C91.0785 189.2 87.3327 189.18 84.2827 187.429L15.3492 147.854C12.2433 146.071 10.3281 142.763 10.3281 139.182L10.3281 59.7131C10.3281 56.1093 12.2672 52.7842 15.4038 51.0096Z"
        stroke={strokeColor}
        stroke-width="20"
      />
    </svg>
  );
};
