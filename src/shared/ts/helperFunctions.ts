import { NavigateFunction } from 'react-router-dom';

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

export const checkAuth = (navigate: NavigateFunction): void => {
  if (!localStorage.getItem('accessToken')) {
    localStorage.clear();
    navigate('/auth', { replace: true });
  }
};

export const clamp = (num: number, min: number, max: number) => Math.min(max, Math.max(num, min));
