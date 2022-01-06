import { Color } from '../../shared/ts/enums';

import { PixelCoinLogoSvgProps } from '../types';

export const PixelCoinLogoSvg: React.FC<PixelCoinLogoSvgProps> = ({ color, className }) => {
  const fillColor: string = color === 'pink' ? Color.PINK : Color.PURPLE;

  return (
    <svg
      className={className}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61115 26.3888 0 17 0C7.61115 0 0 7.61115 0 17C0 26.3888 7.61115 34 17 34ZM15.7106 9.83083L11.3922 12.2769C10.6172 12.7159 10.1382 13.5377 10.1382 14.4285V19.4019C10.1382 20.287 10.6113 21.1046 11.3787 21.5457L15.6972 24.0279C16.452 24.4616 17.3792 24.4666 18.1386 24.041L22.5983 21.541C23.3785 21.1036 23.8618 20.2787 23.8618 19.3841V14.4462C23.8618 13.546 23.3727 12.717 22.5848 12.2817L18.125 9.81798C17.3726 9.40236 16.4585 9.40723 15.7106 9.83083Z"
        fill={fillColor}
      />
    </svg>
  );
};
