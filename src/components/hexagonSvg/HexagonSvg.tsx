import { HexagonSvgProps } from '../types';

let hexagonCount = 0;

export const HexagonSvg: React.FC<HexagonSvgProps> = ({ color, className }) => {
  let colorMatrix = '';
  let fillColor = '';

  hexagonCount++;

  const filterId = `hexagon_filter_${hexagonCount}`;
  const dropShadowId = `hexagon_dropShadow_${hexagonCount}`;
  const backgroundId = `hexagon_background_${hexagonCount}`;

  switch (color) {
    case 'red':
      colorMatrix = '0 0 0 0 0.839216 0 0 0 0 0.188235 0 0 0 0 0.192157 0 0 0 1 0';
      break;
    case 'yellow':
      colorMatrix = '0 0 0 0 1 0 0 0 0 0.92549 0 0 0 0 0.25098 0 0 0 1 0';
      break;
    case 'blue':
      colorMatrix = '0 0 0 0 0.239216 0 0 0 0 0.67451 0 0 0 0 0.992157 0 0 0 1 0';
      break;
  }

  switch (color) {
    case 'red':
      fillColor = '#D63031';
      break;
    case 'yellow':
      fillColor = '#FFEC40';
      break;
    case 'blue':
      fillColor = '#3DACFD';
      break;
  }

  return (
    <svg
      className={className}
      width="215"
      height="231"
      viewBox="0 0 215 231"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${filterId})`}>
        <path d="M103.5 46L160.225 78.75V144.25L103.5 177L46.7753 144.25L46.7753 78.75L103.5 46Z" fill={fillColor} />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M103.5 95.9584C104.116 95.9584 104.678 96.2972 104.953 96.8336L109.144 105L118.359 106.306C118.971 106.393 119.479 106.811 119.671 107.384C119.862 107.957 119.702 108.586 119.259 109.007L112.553 115.378L114.062 124.361C114.161 124.955 113.907 125.552 113.405 125.903C112.904 126.254 112.242 126.297 111.696 126.015L103.5 121.778L95.3039 126.015C94.7585 126.297 94.0962 126.254 93.5946 125.903C93.0931 125.552 92.8389 124.955 92.9386 124.361L94.4472 115.378L87.7406 109.007C87.2978 108.586 87.1385 107.957 87.3296 107.384C87.5207 106.811 88.0291 106.393 88.6411 106.306L97.8559 105L102.047 96.8336C102.322 96.2972 102.885 95.9584 103.5 95.9584ZM103.5 101.082L100.383 107.156C100.145 107.619 99.6899 107.94 99.1636 108.015L92.3662 108.978L97.322 113.686C97.7017 114.047 97.8769 114.566 97.7912 115.076L96.6751 121.722L102.738 118.587C103.215 118.341 103.785 118.341 104.262 118.587L110.325 121.722L109.209 115.076C109.123 114.566 109.298 114.047 109.678 113.686L114.634 108.978L107.836 108.015C107.31 107.94 106.855 107.619 106.617 107.156L103.5 101.082Z"
        fill="#010010"
      />
      <defs>
        <filter
          id={filterId}
          x="0.775391"
          y="0"
          width="213.449"
          height="231"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result={backgroundId} />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values={colorMatrix} />
          <feBlend mode="normal" in2={backgroundId} result={dropShadowId} />
          <feBlend mode="normal" in="SourceGraphic" in2={dropShadowId} result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
