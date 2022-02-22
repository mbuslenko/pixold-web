import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/button/Button';
import { Dropdown } from '../../../components/dropdown/Dropdown';
import { Toggle } from '../../../components/toggle/Toggle';
import { prepareRequest } from '../../../shared/ts/clientCommunication';
import { HexagonInfoType } from '../../../shared/ts/types';
import { useAppDispatch } from '../../../store/store';

import { IPlayPopupSettingsProps } from './interfaces';

import './PlayPopupSettings.scss';

export const PlayPopupSettings: React.FC<IPlayPopupSettingsProps> = ({ hexagonInfo, changeHexagonTypeCallback }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [newHexagonType, setNewHexagon] = useState<HexagonInfoType>();

  const dropdownOptions = [
    { text: 'Attacker', value: 'attack' },
    { text: 'Defender', value: 'defender' },
    { text: 'Miner', value: 'miner' },
  ];

  const getSubscribeOnNotificationsCallback = (notificationsType: string) => {
    return (isChecked: boolean) => {
      prepareRequest(
        navigate,
        dispatch,
      )({
        requestConfig: {
          method: 'post',
          url: '/notifications/subscribe',
          data: {
            notificationsType,
            subscribe: isChecked,
          },
        },
      });
    };
  };

  for (let i = 0; i < dropdownOptions.length; i++) {
    if (dropdownOptions[i].value === hexagonInfo.type) {
      dropdownOptions.splice(i, 1);

      break;
    }
  }

  return (
    <section className="play-popup-settings-content">
      <div className="play-popup-settings-type-selection">
        <div>
          <h3 className="play-popup-content-heading">Type</h3>
          <Dropdown
            placeholder="Choose new type"
            options={dropdownOptions}
            onChange={(value: string) => setNewHexagon(value as HexagonInfoType)}
          />
        </div>
        <Button
          text="Save"
          appearance={{ priority: 'secondary' }}
          onClick={() => {
            if (newHexagonType !== hexagonInfo.type) {
              changeHexagonTypeCallback(newHexagonType);
            }
          }}
        />
      </div>

      <Toggle
        text={'Notify me when hexagon is attacked'}
        priority={'secondary'}
        value={'true'}
        checked={!hexagonInfo.isNotSubscribedOnNotifications.isAttacked}
        onChange={getSubscribeOnNotificationsCallback('is-attacked')}
      />
      <Toggle
        text={'Notify me when storage is full'}
        priority={'secondary'}
        value={'true'}
        checked={!hexagonInfo.isNotSubscribedOnNotifications.fullStorage}
        onChange={getSubscribeOnNotificationsCallback('full-storage')}
      />

      <div>
        <h3 className="play-popup-content-heading">Hexagon customization</h3>
        <p className="play-popup-settings-content-text">Will be soon</p>
      </div>
    </section>
  );
};
