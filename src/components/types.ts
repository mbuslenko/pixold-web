import { IIconProps, ISvgProps } from './interfaces';

export type ElementPriority = 'primary' | 'secondary';

export type InputStatus = 'disabled' | 'valid' | 'invalid';
export type InputType = 'text' | 'number' | 'password' | 'email';

export type ButtonTheme = PrimaryButtonTheme | SecondaryButtonTheme;
export type PrimaryButtonTheme =
  | 'pink'
  | 'black-white'
  | 'white-black'
  | 'google'
  | 'facebook'
  | 'opensea-white'
  | 'opensea-black';
export type SecondaryButtonTheme = 'black-white' | 'yellow' | 'red' | 'blue';

export type ModalTheme = 'blue-dark';
export type ModalPositionType = 'absolute' | 'fixed' | 'relative';

export type AlertType = 'blue' | 'yellow' | 'red' | 'green' | 'gray';

export type HexagonColor = 'red' | 'blue' | 'yellow';
export type HexagonStrokeColor = 'red' | 'purple';
export type CheckmarkColor = 'white' | 'purple';
export type LumenLogoColor = 'pink' | 'purple';
export type PixelCoinLogoColor = 'pink' | 'purple';
export type LogoWithTextColor = 'white' | 'grey';
export type GameMenuShowColor = 'purple' | 'white';
export type OpenseaLogoColor = 'white' | 'black';

export type HexagonSvgProps = ISvgProps<HexagonColor>;
export type HexagonStrokeSvgProps = ISvgProps<HexagonStrokeColor>;
export type CheckmarkSvgProps = ISvgProps<CheckmarkColor>;
export type LumenLogoSvgProps = ISvgProps<LumenLogoColor>;
export type PixelCoinLogoSvgProps = ISvgProps<PixelCoinLogoColor>;
export type LogoWithTextSvgProps = ISvgProps<LogoWithTextColor>;
export type GameMenuShowSvgProps = ISvgProps<GameMenuShowColor>;
export type OpenseaLogoSvgProps = ISvgProps<OpenseaLogoColor>;

export type GameMenuIconName = 'territory' | 'players' | 'redeem' | 'wallet' | 'faq' | 'settings';

export type GameMenuIconSvgProps = IIconProps<GameMenuIconName>;
