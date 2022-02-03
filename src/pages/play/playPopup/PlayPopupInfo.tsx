import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/button/Button';

import { IPlayPopupInfoProps } from './interfaces';

import './PlayPopupInfo.scss';
import { levelNameAll, typeNameAll } from './hexagonInfoData';
import { client } from '../../../shared/ts/ClientCommunication';

export const PlayPopupInfo: React.FC<IPlayPopupInfoProps> = ({
  hexagonId,
  hexagonInfo,
  setModalIsVisibleCallback,
  changeCoinsInStorageCallback,
  changeHealthCallback,
  changeTabCallback,
  drawAttackLineCallback,
}) => {
  const navigate = useNavigate();
  const buttonClassName = hexagonInfo.owner !== localStorage.getItem('username') ? 'play-popup-info-button-hidden' : '';
  const canAttack = hexagonInfo.owner === localStorage.getItem('username') && hexagonInfo.type === 'attack';

  return (
    <section className="play-popup-tab">
      <h2 className="play-popup-heading">
        Hexagon <span className="play-popup-info-hexagon-id">{`#${hexagonId}`}</span>
      </h2>
      <div className="play-popup-info-content">
        <div>
          <h3 className="play-popup-content-heading">Type</h3>
          <p className="play-popup-content-text">{typeNameAll[hexagonInfo.type]}</p>
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
          disabled={hexagonInfo.level === 'supreme'}
        />
        {hexagonInfo.type === 'miner' ? (
          <>
            <div>
              <h3 className="play-popup-content-heading">Coins in storage</h3>
              <p className="play-popup-content-text">{hexagonInfo.coinsInStorage}</p>
            </div>
            <Button
              text={'Send to my wallet'}
              className={buttonClassName}
              appearance={{ priority: 'secondary' }}
              onClick={() =>
                client.prepareRequest(navigate)({
                  requestConfig: {
                    method: 'post',
                    url: '/hexagon/send-coins',
                    data: { numericId: hexagonId },
                  },
                  onResponse: (_, triggerAlertCallback) => {
                    triggerAlertCallback('The coins were successfully delivered to your wallet');
                    changeCoinsInStorageCallback(0);
                  },
                  onError: (error, triggerAlertCallback) => triggerAlertCallback(error.response.data.message),
                })
              }
            />
          </>
        ) : hexagonInfo.type === 'defender' || hexagonInfo.type === 'attack' ? (
          <>
            <div>
              <h3 className="play-popup-content-heading">Health</h3>
              <p className="play-popup-content-text">{hexagonInfo.health}</p>
            </div>
            <Button
              text={'Repair'}
              className={buttonClassName}
              appearance={{ priority: 'secondary' }}
              onClick={() =>
                client.prepareRequest(navigate)({
                  requestConfig: {
                    method: 'post',
                    url: '/hexagon/repair',
                    data: { numericId: hexagonId },
                  },
                  onResponse: (_, triggerAlertCallback) => {
                    triggerAlertCallback('The coins were successfully repaired');
                    changeHealthCallback(100);
                  },
                  onError: (error, triggerAlertCallback) => triggerAlertCallback(error.response.data.message),
                })
              }
            />
          </>
        ) : (
          <></>
        )}
        <div className="play-popup-content-owner">
          <div>
            <h3 className="play-popup-content-heading">Owner</h3>
            <p className="play-popup-content-text">{hexagonInfo.owner}</p>
          </div>

          <Button
            className={`play-popup-info-attack-button ${buttonClassName}`}
            text={'Attack'}
            appearance={{ priority: 'primary' }}
            disabled={!canAttack}
            disabledPopup='You can only attack from a hexagon with the "Attacker" type'
            onClick={drawAttackLineCallback}
          />
        </div>
      </div>
    </section>
  );
};
