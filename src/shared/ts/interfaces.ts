import { AxiosResponse } from 'axios';
import { AlertType } from '../../components/types';

import { HexagonInfoType, RequestData, SocketEventType } from './types';

export interface IGetResponseFaqContent {
  id: string;
  question: string;
  answer: string;
}

export interface IGetResponseFaqTopic {
  id: string;
  name: string;
  content: IGetResponseFaqContent[];
}

export interface IGetResponseWallet {
  username: string;
  balanceInUSD: number;
  balanceInXLM: number;
  balanceInPXL: number;
}

export interface IPostDataWalletConnect {
  userId: string;
  publicKey: string;
  secret: string;
}

export interface ISocketAttackMessage {
  to: string;
  type: Exclude<AlertType, 'info'>;
  message: string;
}

export interface ISocketInfoMessage {
  title: string;
  body: string;
}

export interface ISocketMapMessage {
  from: number;
  to: number;
  attack: 'started' | 'ended';
}

export interface ISocketNewHexagonMessage {
  numericId: number;
  username: string;
}

export interface IPostResponseWalletConnect {
  id: string;
  balanceInUSD: number;
  balanceInXLM: number;
  balanceInPXL: number;
}

export interface IPostDataAuth {
  email: string;
  firstName: string;
  lastName?: string;
  avatarUrl: string;
}

export interface IPostResponseAuth {
  userId: string;
  accessToken: string;
  updateUsername: boolean;
  username: string;
  wallet: IGetResponseWallet;
}

export interface IPostDataUsername {
  username: string;
}

export interface IPostDataRedeemCode {
  code: string;
}

export interface IPostDataHexagonSendCoins {
  numericId: number;
}

export interface IPostDataHexagonChangeType {
  numericId: number;
  type: string;
}

export interface IGetResponseUsernameCheck {
  result: boolean;
}

export interface IGetResponseHexagonFree {
  name: string;
  bid: string;
  purchaseLink: string;
}

export interface IGetResponseUserData {
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  wallet: string;
}

export interface IGetResponseOwnedHexagonAll {
  hexagons: {
    username: string;
    numericIds: number[];
  }[];
  // HACK: test
  attacks: {
    attackedId: number;
    attackerId: number;
  }[];
}

export interface ISocketEventListener<E extends SocketEventType, P extends {}> {
  event: E;
  callback: (payload: P) => void;
}

// TODO: make enum file for this
export enum HexagonLevel {
  starter,
  middle,
  pro,
  supreme,
}

export interface IGetResponseHexagonInfo {
  type: HexagonInfoType;
  level: keyof typeof HexagonLevel;
  coinsInStorage: number;
  owner: string;
  health: number;
  canAttack: boolean;
  coinsToUpgrade: number;
  isNotSubscribedOnNotifications: {
    isAttacked: boolean;
    fullStorage: boolean;
  };
}

export interface IPostDataNotification {
  notificationsType: string;
  subscribe: boolean;
}

export interface IPostDataHexagonBuy {
  numericId: number;
  userId: string;
}

export interface IReactFacebookFailureResponse {
  status?: string | undefined;
}

export interface IReactFacebookLoginInfo {
  id: string;
  userID: string;
  accessToken: string;
  name: string;
  email: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}

export interface IAxiosRequestConfig {
  method: 'post' | 'get';
  url: string;
  data?: RequestData;
  params?: any;
}

export interface IAxiosInstanceProps {
  requestConfig: IAxiosRequestConfig;
  onResponse?: (response: AxiosResponse, triggerAlertCallback: (message: string) => void) => void;
  onError?: (error: any, triggerAlertCallback: (message: string) => void) => void;
}
