import React from 'react';

import { HomeWelcomeScreen } from './HomeWelcomeScreen';
import { HomeInfoScreen } from './HomeInfoScreen';
import { HomeHexagonsScreen } from './HomeHexagonsScreen';
import { HomeOpenseaScreen } from './HomeOpenseaScreen';
import { HomeGetStartedScreen } from './HomeGetStartedScreen';
import { HomeFooter } from './HomeFooter';

export const HomePage: React.FC = () => {
  return (
    <>
      <HomeOpenseaScreen />
      <HomeWelcomeScreen />
      <HomeInfoScreen />
      <HomeHexagonsScreen />
      <HomeGetStartedScreen />
      <HomeFooter />
    </>
  );
};
