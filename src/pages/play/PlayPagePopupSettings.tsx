import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Toggle } from '../../components/toggle/Toggle';
import { getAxiosInstance } from '../../shared/ts/axiosInstance';

import { IPlayPagePopupSettingsProps } from './interfaces';

import './PlayPagePopupSettings.scss';

export const PlayPagePopupSettings: React.FC<IPlayPagePopupSettingsProps> = ({
  hexagonInfo,
  changeHexagonTypeCallback,
}) => {
  const navigate = useNavigate();
  const [newHexagonType, setNewHexagon] = useState<string>();

  return (
    <section className="play-page-popup-settings-content">
      <div className="play-page-popup-settings-type-selection">
        <div>
          <h3 className="play-page-popup-content-heading">Type</h3>
          <Dropdown
            placeholder="Choose new type"
            options={[
              { text: 'Attacker', value: 'attack' },
              { text: 'Defender', value: 'defender' },
              { text: 'Miner', value: 'miner' },
            ]}
            onChange={(value: string) => setNewHexagon(value)}
          />
        </div>
        <Button
          text="Save"
          appearance={{ priority: 'secondary' }}
          onClick={() => changeHexagonTypeCallback(newHexagonType)}
        />
      </div>

      <Toggle
        text={'Notify me when hexagon is attacked'}
        priority={'secondary'}
        value={'true'}
        checked={!hexagonInfo?.isNotSubscribedOnNotifications.isAttacked}
        onChange={(isChecked: boolean) =>
          getAxiosInstance(navigate)({
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
        checked={!hexagonInfo?.isNotSubscribedOnNotifications.fullStorage}
        onChange={(isChecked: boolean) =>
          getAxiosInstance(navigate)({
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
        <h3 className="play-page-popup-content-heading">Hexagon customization</h3>
        <p className="play-page-popup-settings-content-text">Will be soon</p>
      </div>
    </section>
  );
};
