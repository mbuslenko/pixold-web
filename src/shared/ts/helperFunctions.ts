import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { clearAlertAll } from '../../store/alertSlice';
import { clearUserInfo } from '../../store/userSlice';
import { disconnectSocket } from './clientCommunication';

import { ScreenMaxWidth } from './enums';

export const isScreen = (size: ScreenMaxWidth): boolean => {
  return window.innerWidth <= size;
};

export const blockScrolling = (): void => {
  // I block/unblock scrolling this way (not with pure css) so every device would work same
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';
};

export const unblockScrolling = (): void => {
  document.body.style.position = '';
  window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
  document.body.style.top = '';
};

export const redirect = (navigate: NavigateFunction, redirectTo: string): void => {
  if (!localStorage.getItem('accessToken')) {
    navigate('/auth');

    return;
  }

  if (!localStorage.getItem('wallet') && redirectTo === '/wallet') {
    navigate('/coin');

    return;
  }

  navigate(redirectTo);
};

export const checkIsAuth = (dispatch: Dispatch, navigate: NavigateFunction): boolean => {
  if (!localStorage.getItem('accessToken')) {
    navigate('/auth', { replace: true });
    dispatch(clearUserInfo());
    dispatch(clearAlertAll());
    disconnectSocket(dispatch);

    return false;
  }

  return true;
};

export const clamp = (num: number, min: number, max: number) => Math.min(max, Math.max(num, min));

export const adjustDecimalLength = (number: number, decimalLength: number): string => {
  const integer = Math.floor(number);

  // I do number + 1 and n + 1 to eliminate case when number is similar to 0.123
  return `${integer}.${((number + 1) % (integer + 1)).toString().slice(2, 2 + decimalLength)}`;
};
