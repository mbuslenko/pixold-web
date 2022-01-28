import React from 'react';

import { HomeWelcomeScreen } from './HomeWelcomeScreen';
import { HomeInfoScreen } from './HomeInfoScreen';
import { HomeHexagonsScreen } from './HomeHexagonsScreen';
import { HomeOpenseaScreen } from './HomeOpenseaScreen';
import { HomeGetStartedScreen } from './HomeGetStartedScreen';
import { HomeFooter } from './HomeFooter';
import { Alert } from '../../components/alert/Alert';

export const HomePage: React.FC = () => {
  return (
    <>
      <Alert
        type="blue"
        heading="Info Title"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed. Feugiat metus amet, id sed volutpat enim sed. Cras vel vitae, lectus id. Egestas quam auctor commodo porttitor netus risus enim. Nec mi neque malesuada aenean euismod est lorem."
        closeAlertCallback={() => console.log('222')}
      />
      <Alert
        type="green"
        heading="Successfully Message Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur"
        closeAlertCallback={() => console.log('222')}
      />
      <Alert
        type="yellow"
        heading="Alert Message Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur"
        closeAlertCallback={() => console.log('222')}
      />
      <Alert
        type="red"
        heading="Error Message"
        closeAlertCallback={() => console.log('222')}
      />
      <HomeWelcomeScreen />
      <HomeInfoScreen />
      <HomeHexagonsScreen />
      <HomeOpenseaScreen />
      <HomeGetStartedScreen />
      <HomeFooter />
    </>
  );
};
