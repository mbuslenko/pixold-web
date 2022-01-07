import { AxiosResponse } from 'axios';

import { RequestData } from './types';

export interface IGetResponseFaqContent {
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

export interface IGetResponseUsernameCheck {
  result: boolean;
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
