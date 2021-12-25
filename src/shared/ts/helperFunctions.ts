import { ScreenWidth } from './enums';

export const isSmallScreen = (): boolean => (
  window.innerWidth <= ScreenWidth.MOBILE
);

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
