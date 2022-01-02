import React from 'react';

import { HomeFooter } from './HomeFooter';
import { HomeGetStartedScreen } from './HomeGetStartedScreen';
import { HomeHeader } from './HomeHeader';
import { HomeInfoScreen } from './HomeInfoScreen';
import { HomePolygonsScreen } from './HomePolygonsScreen';
import { HomeWelcomeScreen } from './HomeWelcomeScreen';

export const HomePage: React.FC = () => {
  return (
    <>
      <HomeHeader />
      <HomeWelcomeScreen />
      <HomeInfoScreen />
      <HomePolygonsScreen />
      <HomeGetStartedScreen />
      <HomeFooter />
    </>
  );
};
