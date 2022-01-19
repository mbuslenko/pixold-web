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
  IGetResponseAllHexagonOwned,
} from './interfaces';

export type GetResponseFaq = AxiosResponse<IGetResponseFaqTopic[]>;
export type GetResponseWallet = AxiosResponse<IGetResponseWallet>;
export type GetResponseUsernameCheck = AxiosResponse<IGetResponseUsernameCheck>;
export type GetResponseUserData = AxiosResponse<IGetResponseUserData>;
export type GetResponseLoginGoogle = GoogleLoginResponse | GoogleLoginResponseOffline;
export type GetResponseHexagonFree = AxiosResponse<IGetResponseHexagonFree>;
export type GetResponseLoginFacebook = IReactFacebookLoginInfo | IReactFacebookFailureResponse;
export type GetResponseAllHexagonOwned = AxiosResponse<IGetResponseAllHexagonOwned>;

export type PostResponseWalletConnect = AxiosResponse<IPostResponseWalletConnect>;
export type PostResponseAuth = AxiosResponse<IPostResponseAuth>;

export type RequestData = IPostDataAuth | IPostDataWalletConnect | IPostDataUsername | IPostDataRedeemCode;

export type AxiosInstanceFunction = (payload: IAxiosInstanceProps) => void;
