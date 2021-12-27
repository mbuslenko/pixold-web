import { AxiosResponse } from 'axios';

export interface IAxiosInstanceProps {
  postUrl: string;
  postData?: any;
  responseCallback: (response: AxiosResponse<any, any>) => void;
  errorCallback: (error: any) => void;
}
