import { AxiosResponse } from 'axios';

import {
  IGetResponseFaqTopic,
  IGetResponseUsernameCheck,
  IGetResponseWallet,
  IPostDataAuth,
  IPostDataUsername,
  IPostDataWalletConnect,
  IPostResponseAuth,
  IPostResponseWalletConnect,
} from './interfaces';

export type GetResponseFaq = AxiosResponse<IGetResponseFaqTopic[]>;
export type GetResponseWallet = AxiosResponse<IGetResponseWallet>;
export type GetResponseUsernameCheck = AxiosResponse<IGetResponseUsernameCheck>;

export type PostResponseWalletConnect = AxiosResponse<IPostResponseWalletConnect>;
export type PostResponseAuth = AxiosResponse<IPostResponseAuth>;

export type RequestData = IPostDataAuth | IPostDataWalletConnect | IPostDataUsername;
