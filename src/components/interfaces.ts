import { AxiosResponse } from 'axios';

import { RequestData } from '../shared/ts/types';

export interface IAxiosInstanceProps {
  requestMethod: 'post' | 'get',
  requestUrl: string;
  requestData?: RequestData;
  requestParams?: any;
  responseCallback: (response: AxiosResponse) => void;
  errorCallback?: (error: any) => void;
}
