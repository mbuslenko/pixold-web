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
  if (!window.localStorage.getItem('accessToken') && redirectTo === '/play') {
    navigate('/auth');

    return;
  }

  navigate(redirectTo);
};
