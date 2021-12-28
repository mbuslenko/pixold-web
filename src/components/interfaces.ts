import { AxiosResponse } from 'axios';

export interface IAxiosInstanceProps {
  requestMethod: 'post' | 'get',
  requestUrl: string;
  requestData?: any;
  responseCallback: (response: AxiosResponse) => void;
  errorCallback: (error: any) => void;
}
