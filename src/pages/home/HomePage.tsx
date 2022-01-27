import React from 'react';

import { HomeWelcomeScreen } from './HomeWelcomeScreen';
import { HomeInfoScreen } from './HomeInfoScreen';
import { HomeHexagonsScreen } from './HomeHexagonsScreen';
import { HomeOpenseaScreen } from './HomeOpenseaScreen';
import { HomeGetStartedScreen } from './HomeGetStartedScreen';
import { HomeFooter } from './HomeFooter';
import { NumberAnimation } from '../../components/numberAnimation/NumberAnimation';

export const HomePage: React.FC = () => {
  return (
    <>
      <NumberAnimation number={1000000000} />
      <HomeWelcomeScreen />
      <HomeInfoScreen />
      <HomeHexagonsScreen />
      <HomeOpenseaScreen />
      <HomeGetStartedScreen />
      <HomeFooter />
    </>
  );
};
