import { useState } from 'react';

import { Color, ScreenMaxWidth } from '../../shared/ts/enums';
import { isScreen } from '../../shared/ts/helperFunctions';

import { GameMenuIconSvgProps } from '../types';

const faqIconPath = [
  'M11 14.0689C11 10.7172 13.8803 8 17.4332 8C19.1394 8 20.7757 8.63941 21.9822 9.77755C23.1887 10.9157 23.8665 12.4594 23.8665 14.0689C23.8665 17.4207 20.9862 20.1379 17.4332 20.1379C13.8803 20.1379 11 17.4207 11 14.0689Z',
  'M23.76 18.958L25.676 20.4015H25.7093C26.0969 20.7672 26.0969 21.3601 25.7093 21.7257C25.3216 22.0914 24.6932 22.0914 24.3055 21.7257L22.7155 20.0249C22.5652 19.8836 22.4807 19.6917 22.4807 19.4915C22.4807 19.2913 22.5652 19.0993 22.7155 18.958C23.0054 18.6893 23.4701 18.6893 23.76 18.958Z',
];
const playersIconPath = [
  'M22.4022 11.7037C22.4022 13.7597 20.8696 15.4083 18.9583 15.4083C17.0469 15.4083 15.5143 13.7597 15.5143 11.7037C15.5143 9.64699 17.0469 8 18.9583 8C20.8696 8 22.4022 9.64699 22.4022 11.7037Z',
  'M18.9583 22C16.151 22 13.7538 21.524 13.7538 19.6201C13.7538 17.7155 16.1356 17.2222 18.9583 17.2222C21.7656 17.2222 24.1627 17.6981 24.1627 19.6028C24.1627 21.5067 21.781 22 18.9583 22Z',
  'M23.874 11.7706C23.874 12.8186 23.5817 13.795 23.0688 14.6067C23.0161 14.6902 23.063 14.8029 23.156 14.8203C23.2842 14.8439 23.4168 14.8573 23.5516 14.8612C24.896 14.8991 26.1025 13.9684 26.4359 12.5673C26.9296 10.4861 25.4798 8.61766 23.6337 8.61766C23.433 8.61766 23.241 8.64051 23.0542 8.68149C23.0286 8.68779 23.0014 8.7004 22.9868 8.72483C22.9692 8.75478 22.9824 8.79497 23 8.82098C23.5545 9.65708 23.874 10.6768 23.874 11.7706Z',
  'M26.1004 16.3235C27.0037 16.5134 27.5978 16.9011 27.844 17.4646C28.052 17.9271 28.052 18.4638 27.844 18.9256C27.4674 19.7995 26.2535 20.08 25.7817 20.1525C25.6842 20.1683 25.6058 20.0777 25.6161 19.9729C25.8571 17.5513 23.9399 16.4031 23.4439 16.1391C23.4227 16.1273 23.4183 16.1092 23.4205 16.0981C23.4219 16.0902 23.4307 16.0776 23.4469 16.0753C24.5201 16.054 25.674 16.2116 26.1004 16.3235Z',
  'M14.4486 14.8612C14.5834 14.8572 14.7152 14.8446 14.8442 14.8202C14.9372 14.8028 14.9841 14.6901 14.9313 14.6066C14.4185 13.7949 14.1262 12.8186 14.1262 11.7705C14.1262 10.6767 14.4456 9.657 15.0002 8.8209C15.0177 8.79489 15.0302 8.7547 15.0134 8.72475C14.9987 8.70111 14.9709 8.68772 14.946 8.68142C14.7584 8.64044 14.5665 8.61758 14.3658 8.61758C12.5196 8.61758 11.0698 10.486 11.5643 12.5672C11.8976 13.9683 13.1043 14.899 14.4486 14.8612Z',
  'M14.5793 16.0977C14.5815 16.1095 14.5771 16.1268 14.5566 16.1394C14.0599 16.4034 12.1427 17.5516 12.3837 19.9724C12.394 20.078 12.3163 20.1678 12.2189 20.1529C11.7471 20.0804 10.5332 19.7998 10.1566 18.9259C9.9478 18.4633 9.9478 17.9275 10.1566 17.4649C10.4027 16.9014 10.9961 16.5137 11.8994 16.323C12.3265 16.2119 13.4797 16.0543 14.5537 16.0756C14.5698 16.078 14.5778 16.0906 14.5793 16.0977Z',
];
const redeemIconPath = [
  'M24.4327 15.0007C24.4327 15.543 24.9003 15.9843 25.475 15.9843C25.7648 15.9843 26 16.2062 26 16.4797V18.2639C26 19.7727 24.6994 21 23.1006 21H14.9001C13.3013 21 12 19.7727 12 18.2639V16.4797C12 16.2062 12.2352 15.9843 12.525 15.9843C13.1004 15.9843 13.568 15.543 13.568 15.0007C13.568 14.4722 13.1193 14.0745 12.525 14.0745C12.3857 14.0745 12.2527 14.0223 12.154 13.9292C12.0553 13.8361 12 13.7099 12 13.5791L12.0014 11.7368C12.0014 10.228 13.302 9 14.9008 9H23.0992C24.698 9 25.9993 10.228 25.9993 11.7368L26 13.5216C26 13.6524 25.9447 13.7793 25.8467 13.8717C25.748 13.9649 25.615 14.0171 25.475 14.0171C24.9003 14.0171 24.4327 14.4583 24.4327 15.0007ZM20.5764 15.432L21.4017 14.6737C21.5452 14.5429 21.5949 14.35 21.5326 14.1716C21.471 13.9933 21.31 13.8665 21.1154 13.8407L19.9751 13.6835L19.4648 12.7085C19.3773 12.5407 19.1995 12.4363 19.0014 12.4356H19C18.8026 12.4356 18.6248 12.54 18.5359 12.7078L18.0256 13.6835L16.8874 13.84C16.6907 13.8665 16.5297 13.9933 16.4674 14.1716C16.4058 14.35 16.4555 14.5429 16.5983 14.6737L17.4236 15.432L17.229 16.5041C17.1954 16.6891 17.2745 16.8727 17.4355 16.983C17.5265 17.0445 17.6322 17.0762 17.7393 17.0762C17.8212 17.0762 17.9038 17.057 17.9794 17.0194L19 16.5134L20.0185 17.0181C20.1949 17.1072 20.4042 17.0934 20.5645 16.9824C20.7262 16.8727 20.8053 16.6891 20.7717 16.5041L20.5764 15.432Z',
];
const settingsIconPath = [
  'M25.1912 16.106C25.4548 16.239 25.6581 16.449 25.8012 16.659C26.0798 17.093 26.0572 17.625 25.7861 18.094L25.259 18.934C24.9804 19.382 24.4608 19.662 23.9261 19.662C23.6626 19.662 23.3689 19.592 23.1279 19.452C22.9321 19.333 22.7062 19.291 22.4653 19.291C21.7198 19.291 21.0948 19.872 21.0722 20.565C21.0722 21.37 20.3794 22 19.5134 22H18.4893C17.6158 22 16.923 21.37 16.923 20.565C16.908 19.872 16.283 19.291 15.5375 19.291C15.289 19.291 15.0631 19.333 14.8748 19.452C14.6339 19.592 14.3326 19.662 14.0766 19.662C13.5344 19.662 13.0149 19.382 12.7362 18.934L12.2167 18.094C11.938 17.639 11.923 17.093 12.2016 16.659C12.3221 16.449 12.548 16.239 12.804 16.106C13.0148 16.008 13.1504 15.847 13.2784 15.658C13.6549 15.056 13.429 14.265 12.7889 13.908C12.0434 13.509 11.8025 12.62 12.2317 11.927L12.7362 11.101C13.173 10.408 14.1067 10.163 14.8598 10.569C15.5149 10.905 16.3658 10.681 16.7498 10.086C16.8703 9.89 16.9381 9.68 16.923 9.47C16.908 9.197 16.9908 8.938 17.1339 8.728C17.4125 8.294 17.917 8.014 18.4667 8H19.5285C20.0857 8 20.5903 8.294 20.8689 8.728C21.0044 8.938 21.0948 9.197 21.0722 9.47C21.0571 9.68 21.1249 9.89 21.2454 10.086C21.6294 10.681 22.4803 10.905 23.143 10.569C23.8885 10.163 24.8298 10.408 25.259 11.101L25.7635 11.927C26.2002 12.62 25.9593 13.509 25.2063 13.908C24.5662 14.265 24.3403 15.056 24.7243 15.658C24.8448 15.847 24.9804 16.008 25.1912 16.106ZM16.8703 15.007C16.8703 16.106 17.8266 16.981 19.0089 16.981C20.1911 16.981 21.1249 16.106 21.1249 15.007C21.1249 13.908 20.1911 13.026 19.0089 13.026C17.8266 13.026 16.8703 13.908 16.8703 15.007Z',
];
const territoryIconPath = [
  'M14.4907 10.5815L17.4344 8.86779C18.3573 8.3305 19.4963 8.32435 20.4249 8.85163L23.4812 10.587C24.42 11.12 25 12.1162 25 13.1958V16.7661C25 17.8389 24.4272 18.83 23.4976 19.3656L20.4415 21.1263C19.5044 21.6662 18.3493 21.6599 17.4181 21.1098L14.4742 19.3708C13.5606 18.8311 13 17.8489 13 16.7878V13.1741C13 12.1062 13.5677 11.1188 14.4907 10.5815Z',
];
const walletIconPath = [
  'M23.0382 12.8869H26C26 10.4333 24.5751 9 22.1609 9H15.8391C13.4249 9 12 10.4333 12 12.8556V18.1444C12 20.5667 13.4249 22 15.8391 22H22.1609C24.5751 22 26 20.5667 26 18.1444V17.9191H23.0382C21.6636 17.9191 20.5493 16.7982 20.5493 15.4155C20.5493 14.0328 21.6636 12.9119 23.0382 12.9119V12.8869ZM23.0382 13.9634H25.4773C25.766 13.9634 26 14.1988 26 14.4892V16.3168C25.9966 16.6058 25.7646 16.8392 25.4773 16.8426H23.0942C22.3984 16.852 21.7898 16.3727 21.632 15.6909C21.553 15.2677 21.6639 14.8309 21.9351 14.4977C22.2064 14.1645 22.6101 13.9689 23.0382 13.9634ZM23.144 15.8849H23.3742C23.6698 15.8849 23.9093 15.6439 23.9093 15.3467C23.9093 15.0494 23.6698 14.8084 23.3742 14.8084H23.144C23.0027 14.8067 22.8665 14.862 22.766 14.962C22.6655 15.0619 22.6089 15.1982 22.6089 15.3404C22.6089 15.6387 22.8475 15.8815 23.144 15.8849ZM15.3164 12.8869H19.2676C19.5631 12.8869 19.8027 12.6459 19.8027 12.3486C19.8027 12.0513 19.5631 11.8103 19.2676 11.8103H15.3164C15.0233 11.8103 14.7847 12.0475 14.7813 12.3423C14.7813 12.6406 15.0199 12.8834 15.3164 12.8869Z',
];

export const GameMenuIconSvg: React.FC<GameMenuIconSvgProps> = ({ iconName, className }) => {
  const initFillColor = isScreen(ScreenMaxWidth.SMALL) ? Color.WHITE : Color.PURPLE;
  const initOpacity = isScreen(ScreenMaxWidth.SMALL) ? '1' : '0.5';
  const [fillColor, setFillColor] = useState<string>(initFillColor);
  const [opacity, setOpacity] = useState<string>(initOpacity);
  let iconPath: string[] = [];

  const onMouseEnterCallback = () => {
    setFillColor(Color.WHITE);
    setOpacity('1');
  };

  const onMouseLeaveCallback = () => {
    setFillColor(Color.PURPLE);
    setOpacity('0.5');
  };

  switch (iconName) {
    case 'faq':
      iconPath = faqIconPath;
      break;
    case 'players':
      iconPath = playersIconPath;
      break;
    case 'redeem':
      iconPath = redeemIconPath;
      break;
    case 'settings':
      iconPath = settingsIconPath;
      break;
    case 'territory':
      iconPath = territoryIconPath;
      break;
    case 'wallet':
      iconPath = walletIconPath;
      break;
  }

  return (
    <svg
      onMouseEnter={onMouseEnterCallback}
      onMouseLeave={onMouseLeaveCallback}
      className={className}
      width="37"
      height="31"
      viewBox="0 0 37 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.9757 4.92787L33.8955 9.804C35.7693 12.9333 35.7907 16.8347 33.9513 19.9843L30.9589 25.1082C29.1662 28.178 25.8785 30.0652 22.3237 30.0652L15.6316 30.0652C12.0995 30.0652 8.8294 28.2019 7.02872 25.1632L3.99276 20.04C2.10981 16.8626 2.13163 12.9059 4.04951 9.7494L7.01264 4.87258C8.82631 1.88758 12.066 0.0651845 15.5588 0.0651846L22.3962 0.0651849C25.912 0.0651851 29.1696 1.91148 30.9757 4.92787Z"
        fill='#604AF7'
        fillOpacity={opacity}
      />
      {iconPath.map((value, index) => (
        <path
          d={value}
          fill={fillColor}
          key={index}
        />
      ))}
    </svg>
  );
};
