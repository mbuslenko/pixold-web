import axios, { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { io } from 'socket.io-client';
import { IAxiosInstanceProps } from './interfaces';
import { AxiosInstanceFunction, SocketEventListener } from './types';

class ClientCommunication {
  private readonly _axios: AxiosInstance;
  private _socket: ReturnType<typeof io> | null;
  onSocketConnect: () => void;
  onSocketDisconnect: () => void;
  requestResponseCallback: (responseMessage: string) => void;
  onRequestError: (errorMessage: string) => void;

  constructor() {
    this._axios = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
    });
    this.onSocketConnect = () => {
      /* HACK */
    };
    this.onSocketDisconnect = () => {
      /* HACK */
    };
    this.requestResponseCallback = () => {
      /* HACK */
    };
    this.onRequestError = () => {
      /* HACK */
    };
    this._socket = null;
  }

  prepareRequest(navigate: NavigateFunction): AxiosInstanceFunction {
    return (payload: IAxiosInstanceProps) => {
      const { requestConfig, onResponse, onError } = payload;
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        this._axios.defaults.headers.common.Authorization = accessToken;
      }

      this._axios
        .request(requestConfig)
        .then(response => {
          if (onResponse) {
            onResponse(response, this.requestResponseCallback);
          }
        })
        .catch(error => {
          if (!error.response) {
            this._axios.get(
              `https://api.telegram.org/bot5014031741:AAFC3FFScFltAqKPeJ0QnWxYNFKHRDH4Y-E/sendMessage?chat_id=-709885501&text=@mbuslenko SERVER ERROR RESPONSE IS UNDEFINED`,
            );
            navigate('/500');

            return;
          }

          const { status } = error.response;

          if (status === 403 || status === 401) {
            this.disconnectSocket();

            localStorage.clear();

            navigate('/auth', { replace: true });

            return;
          }

          if (status === 500) {
            navigate('/500');

            return;
          }

          if (onError) {
            onError(error, this.onRequestError);
          }
        });
    };
  }

  onEvent(eventListener: SocketEventListener): void {
    if (!this._socket) {
      throw new Error('socket is not connected');
    }

    this._socket.on(eventListener.event, eventListener.callback);
  }

  removeEventListenerAll(event: 'attack' | 'info'): void {
    if (!this._socket) {
      throw new Error('socket is not connected');
    }

    this._socket.removeAllListeners(event);
  }

  connectSocket(): void {
    if (localStorage.getItem('accessToken')) {
      this._socket = io(process.env.REACT_APP_BASE_URL as string);
      this.onSocketConnect();
    }
  }

  disconnectSocket(): void {
    if (!this._socket) {
      throw new Error('socket is not connected');
    }

    this._socket.disconnect();
    this.onSocketDisconnect();
    this._socket = null;
  }
}

export const client = new ClientCommunication();
