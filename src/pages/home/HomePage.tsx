import React from 'react';

import { HomeFooter } from './HomeFooter';
import { HomeGetStartedScreen } from './HomeGetStartedScreen';
import { HomeInfoScreen } from './HomeInfoScreen';
import { HomeHexagonsScreen } from './HomeHexagonsScreen';
import { HomeWelcomeScreen } from './HomeWelcomeScreen';

export const HomePage: React.FC = () => {
  return (
    <>
      <HomeWelcomeScreen />
      <HomeInfoScreen />
      <HomeHexagonsScreen />
      <HomeGetStartedScreen />
      <HomeFooter />
    </>
  );
};
