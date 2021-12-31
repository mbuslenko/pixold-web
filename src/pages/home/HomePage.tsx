import React from 'react';

import './HomePage.scss';
import { Footer } from './Footer';
import { GetStartedScreen } from './GetStartedScreen';
import { Header } from './Header';
import { InfoScreen } from './InfoScreen';
import { PolygonsScreen } from './PolygonsScreen';
import { StartScreen } from './StartScreen';

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <StartScreen />
      <InfoScreen />
      <PolygonsScreen />
      <GetStartedScreen />
      <Footer />
    </>
  );
};
