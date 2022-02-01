import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/button/Button';

import { IPlayPopupInfoProps } from './interfaces';

import './PlayPopupInfo.scss';
import { levelNameAll } from './hexagonInfoData';
import { client } from '../../../shared/ts/ClientCommunication';

export const PlayPopupInfo: React.FC<IPlayPopupInfoProps> = ({
  hexagonId,
  hexagonInfo,
  setModalIsVisibleCallback,
  changeTabCallback,
}) => {
  const navigate = useNavigate();
  const buttonClassName = hexagonInfo.owner !== localStorage.getItem('username') ? 'play-popup-info-button-hidden' : '';
  const canAttack = hexagonInfo.owner !== localStorage.getItem('username') || hexagonInfo.type !== 'attack';

  return (
    <section className="play-popup-tab">
      <h2 className="play-popup-heading">
        Hexagon <span className="play-popup-info-hexagon-id">{`#${hexagonId}`}</span>
      </h2>
      <div className="play-popup-info-content">
        <div>
          <h3 className="play-popup-content-heading">Type</h3>
          <p className="play-popup-content-text">
            {hexagonInfo.type.slice(0, 1).toUpperCase() + hexagonInfo.type.slice(1)}
          </p>
        </div>
        <Button
          text={'Change'}
          appearance={{ priority: 'secondary' }}
          className={buttonClassName}
          onClick={() => changeTabCallback('settings')}
        />
        <div>
          <h3 className="play-popup-content-heading">Level</h3>
          <p className="play-popup-content-text">{levelNameAll[hexagonInfo.level]}</p>
        </div>
        <Button
          text={'Upgrade'}
          appearance={{ priority: 'secondary' }}
          className={buttonClassName}
          onClick={() => setModalIsVisibleCallback(true)}
        />
        <div>
          <h3 className="play-popup-content-heading">Coins in storage</h3>
          <p className="play-popup-content-text">{hexagonInfo.coinsInStorage}</p>
        </div>
        <Button
          text={'Send to my wallet'}
          disabled={hexagonInfo.type !== 'miner'}
          className={buttonClassName}
          appearance={{ priority: 'secondary' }}
          onClick={() =>
            client.prepareRequest(navigate)({
              requestConfig: {
                method: 'post',
                url: '/hexagon/send-coins',
                data: { numericId: hexagonId },
              },
              onResponse: (_, triggerAlertCallback) =>
                triggerAlertCallback('The coins were successfully delivered to your wallet'),
              onError: (error, triggerAlertCallback) =>
                triggerAlertCallback(error.response.data.message),
            })
          }
        />
        <div className="play-popup-content-owner">
          <div>
            <h3 className="play-popup-content-heading">Owner</h3>
            <p className="play-popup-content-text">{hexagonInfo.owner}</p>
          </div>
          <Button
            className="play-popup-info-attack-button"
            text={'Attack'}
            disabled={canAttack}
            appearance={{ priority: 'primary' }}
          />
        </div>
      </div>
    </section>
  );
};
