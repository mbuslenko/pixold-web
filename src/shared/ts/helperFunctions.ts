export const isSmallScreen = (): boolean => (
  // TODO: make constants for window resolutions
  window.innerWidth <= 425
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
