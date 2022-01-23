import React, { useState } from 'react';

import { TabbedButtonGroup } from '../../components/tabbedButtonGroup/TabbedButtonGroup';

import './PlayPagePopup.scss';
import { IPlayPagePopupProps } from './interfaces';
import { PlayPagePopupInfo } from './PlayPagePopupInfo';
import { PlayPagePopupLevel } from './PlayPagePopupLevel';
import { PlayPagePopupSettings } from './PlayPagePopupSettings';

export const PlayPagePopup: React.FC<IPlayPagePopupProps> = ({ closePopupCallback }) => {
  const [playPagePopupTab, setPlayPagePopupTab] = useState<React.FC>(PlayPagePopupSettings);

  const onChangeTabCallback = (value: string) => {
    switch (value) {
      case 'level':
        setPlayPagePopupTab(PlayPagePopupLevel);
        break;
      case 'settings':
        setPlayPagePopupTab(PlayPagePopupSettings);
        break;
      default:
        setPlayPagePopupTab(PlayPagePopupInfo);
        break;
    }
  };

  return (
    <section className="play-page-popup">
      <div className="play-page-popup-menu">
        <TabbedButtonGroup
          name={'play-menu-popup-tab'}
          options={[
            { text: 'Info', value: 'info' },
            { text: 'Level', value: 'level' },
            { text: 'Settings', value: 'settings' },
          ]}
          onChange={onChangeTabCallback}
        />
        <button className="play-page-close-popup-button" onClick={closePopupCallback}>
          X
        </button>
      </div>
      {playPagePopupTab}
    </section>
  );
};
