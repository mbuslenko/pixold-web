import React from 'react';

import { HomeWelcomeScreen } from './HomeWelcomeScreen';
import { HomeInfoScreen } from './HomeInfoScreen';
import { HomeHexagonsScreen } from './HomeHexagonsScreen';
import { HomeGetStartedScreen } from './HomeGetStartedScreen';
import { HomeFooter } from './HomeFooter';

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
