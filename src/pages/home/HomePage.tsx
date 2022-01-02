import React from 'react';

import { HomeFooter } from './HomeFooter';
import { HomeGetStartedScreen } from './HomeGetStartedScreen';
import { HomeInfoScreen } from './HomeInfoScreen';
import { HomePolygonsScreen } from './HomePolygonsScreen';
import { HomeWelcomeScreen } from './HomeWelcomeScreen';

export const HomePage: React.FC = () => {
  return (
    <>
      <HomeWelcomeScreen />
      <HomeInfoScreen />
      <HomePolygonsScreen />
      <HomeGetStartedScreen />
      <HomeFooter />
    </>
  );
};
