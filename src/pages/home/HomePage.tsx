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
        heading="Servers update"
        text="Our servers are going through an upgrade. There may be technical problems in the game and services for 10 minutes. Please do not make any serious actions with your balance, etc."
        closeAlertCallback={() => console.log('222')}
      />
      <Alert type="green" heading="Type was changed successfully" closeAlertCallback={() => console.log('222')} />
      <Alert
        type="yellow"
        heading="Your previous attack was failed, Your previous attack was failed"
        closeAlertCallback={() => console.log('222')}
      />
      <Alert
        type="red"
        heading="You can not change type of other user hexagon, You can not change type of other user"
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
