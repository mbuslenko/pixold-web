import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/button/Button';
import { Dropdown } from '../../../components/dropdown/Dropdown';
import { Toggle } from '../../../components/toggle/Toggle';
import { client } from '../../../shared/ts/ClientCommunication';
import { HexagonInfoType } from '../../../shared/ts/types';

import { IPlayPopupSettingsProps } from './interfaces';

import './PlayPopupSettings.scss';

export const PlayPopupSettings: React.FC<IPlayPopupSettingsProps> = ({ hexagonInfo, changeHexagonTypeCallback }) => {
  const navigate = useNavigate();
  const [newHexagonType, setNewHexagon] = useState<HexagonInfoType>();

  return (
    <section className="play-popup-settings-content">
      <div className="play-popup-settings-type-selection">
        <div>
          <h3 className="play-popup-content-heading">Type</h3>
          <Dropdown
            placeholder="Choose new type"
            options={[
              { text: 'Attacker', value: 'attack' },
              { text: 'Defender', value: 'defender' },
              { text: 'Miner', value: 'miner' },
            ]}
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
        onChange={(isChecked: boolean) =>
          client.prepareRequest(navigate)({
            requestConfig: {
              method: 'post',
              url: '/notifications/subscribe',
              data: {
                notificationsType: 'is-attacked',
                subscribe: isChecked,
              },
            },
          })
        }
      />
      <Toggle
        text={'Notify me when storage is full'}
        priority={'secondary'}
        value={'true'}
        checked={!hexagonInfo.isNotSubscribedOnNotifications.fullStorage}
        onChange={(isChecked: boolean) =>
          client.prepareRequest(navigate)({
            requestConfig: {
              method: 'post',
              url: '/notifications/subscribe',
              data: {
                notificationsType: 'full-storage',
                subscribe: isChecked,
              },
            },
          })
        }
      />

      <div>
        <h3 className="play-popup-content-heading">Hexagon customization</h3>
        <p className="play-popup-settings-content-text">Will be soon</p>
      </div>
    </section>
  );
};
