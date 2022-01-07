import { AxiosResponse } from 'axios';

import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import {
  IGetResponseFaqTopic,
  IGetResponseUsernameCheck,
  IGetResponseWallet,
  IPostDataAuth,
  IPostDataUsername,
  IPostDataWalletConnect,
  IPostResponseAuth,
  IPostResponseWalletConnect,
  IAxiosInstanceProps,
  IPostDataRedeemCode,
  IReactFacebookFailureResponse,
  IReactFacebookLoginInfo,
} from './interfaces';

export type GetResponseFaq = AxiosResponse<IGetResponseFaqTopic[]>;
export type GetResponseWallet = AxiosResponse<IGetResponseWallet>;
export type GetResponseUsernameCheck = AxiosResponse<IGetResponseUsernameCheck>;
export type GetResponseLoginGoogle = GoogleLoginResponse | GoogleLoginResponseOffline;
export type GetResponseLoginFacebook = IReactFacebookLoginInfo | IReactFacebookFailureResponse;

export type PostResponseWalletConnect = AxiosResponse<IPostResponseWalletConnect>;
export type PostResponseAuth = AxiosResponse<IPostResponseAuth>;

export type RequestData = IPostDataAuth | IPostDataWalletConnect | IPostDataUsername | IPostDataRedeemCode;

export type AxiosInstanceFunction = (payload: IAxiosInstanceProps) => void;
