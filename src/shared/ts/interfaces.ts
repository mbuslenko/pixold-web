import { AxiosResponse } from 'axios';

import { RequestData } from './types';

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
}

export interface IPostDataUsername {
  username: string;
}

export interface IPostDataRedeemCode {
  code: string;
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
  username: string;
  numericIds: number[];
}

export interface IGetResponseHexagonInfo {
  type: string;
  level: string;
  coinsInStorage: number;
  owner: string;
  canAttack: boolean;
  coinsToUpgrade: number;
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
  onResponse: (response: AxiosResponse) => void;
  onError?: (error: any) => void;
}
