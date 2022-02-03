import { AxiosResponse } from 'axios';

import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import {
  IGetResponseFaqTopic,
  IGetResponseUsernameCheck,
  IGetResponseWallet,
  IGetResponseUserData,
  IPostDataAuth,
  IPostDataUsername,
  IPostDataWalletConnect,
  IPostResponseAuth,
  IPostResponseWalletConnect,
  IAxiosInstanceProps,
  IGetResponseHexagonFree,
  IPostDataRedeemCode,
  IReactFacebookFailureResponse,
  IReactFacebookLoginInfo,
  IGetResponseOwnedHexagonAll,
  IGetResponseHexagonInfo,
  IPostDataHexagonChangeType,
  IPostDataHexagonSendCoins,
  IPostDataHexagonBuy,
  IPostDataNotification,
  ISocketEventListener,
  ISocketAttackMessage,
  ISocketInfoMessage,
  ISocketMapMessage,
  ISocketNewHexagonMessage,
  IPostDataHexagonAttack,
} from './interfaces';

export type HexagonInfoType = 'attack' | 'defender' | 'miner' | 'without';

export type GetResponseFaq = AxiosResponse<IGetResponseFaqTopic[]>;
export type GetResponseWallet = AxiosResponse<IGetResponseWallet>;
export type GetResponseUsernameCheck = AxiosResponse<IGetResponseUsernameCheck>;
export type GetResponseUserData = AxiosResponse<IGetResponseUserData>;
export type GetResponseLoginGoogle = GoogleLoginResponse | GoogleLoginResponseOffline;
export type GetResponseHexagonFree = AxiosResponse<IGetResponseHexagonFree>;
export type GetResponseLoginFacebook = IReactFacebookLoginInfo | IReactFacebookFailureResponse;
export type GetResponseAllHexagonOwned = AxiosResponse<IGetResponseOwnedHexagonAll>;
export type GetResponseHexagonInfo = AxiosResponse<IGetResponseHexagonInfo>;

export type PostResponseWalletConnect = AxiosResponse<IPostResponseWalletConnect>;
export type PostResponseAuth = AxiosResponse<IPostResponseAuth>;

export type RequestData =
  | IPostDataAuth
  | IPostDataWalletConnect
  | IPostDataUsername
  | IPostDataRedeemCode
  | IPostDataHexagonChangeType
  | IPostDataHexagonSendCoins
  | IPostDataHexagonBuy
  | IPostDataHexagonAttack
  | IPostDataNotification;

export type AxiosInstanceFunction = (payload: IAxiosInstanceProps) => void;

export type SocketEventType = 'attack' | 'info' | 'map' | 'newHexagon';
export type SocketEventListener =
  | ISocketEventListener<'attack', ISocketAttackMessage>
  | ISocketEventListener<'info', ISocketInfoMessage>
  | ISocketEventListener<'map', ISocketMapMessage>
  | ISocketEventListener<'newHexagon', ISocketNewHexagonMessage>;
