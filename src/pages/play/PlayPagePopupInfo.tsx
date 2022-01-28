import { useNavigate } from 'react-router-dom';

import { getAxiosInstance } from '../../shared/ts/axiosInstance';

import { Button } from '../../components/button/Button';

import { IPlayPagePopupInfoProps } from './interfaces';

import './PlayPagePopupInfo.scss';
import { levelNameAll } from './hexagonInfoData';

export const PlayPagePopupInfo: React.FC<IPlayPagePopupInfoProps> = ({
  hexagonId,
  hexagonInfo,
  setModalIsVisibleCallback,
  setAlertPropsCallback,
  changeTabCallback,
}) => {
  const navigate = useNavigate();
  const buttonClassName =
    hexagonInfo.owner !== localStorage.getItem('username') ? 'play-page-popup-info-button-hidden' : '';

  return (
    <section className="play-page-popup-tab">
      <h2 className="play-page-popup-heading">
        Hexagon <span className="play-page-popup-info-hexagon-id">{`#${hexagonId}`}</span>
      </h2>
      <div className="play-page-popup-info-content">
        <div>
          <h3 className="play-page-popup-content-heading">Type</h3>
          <p className="play-page-popup-content-text">
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
          <h3 className="play-page-popup-content-heading">Level</h3>
          <p className="play-page-popup-content-text">{levelNameAll[hexagonInfo.level]}</p>
        </div>
        <Button
          text={'Upgrade'}
          appearance={{ priority: 'secondary' }}
          className={buttonClassName}
          onClick={() => setModalIsVisibleCallback(true)}
        />
        <div>
          <h3 className="play-page-popup-content-heading">Coins in storage</h3>
          <p className="play-page-popup-content-text">{hexagonInfo.coinsInStorage}</p>
        </div>
        <Button
          text={'Send to my wallet'}
          disabled={hexagonInfo.type !== 'miner'}
          className={buttonClassName}
          appearance={{ priority: 'secondary' }}
          onClick={() =>
            getAxiosInstance(navigate)({
              requestConfig: {
                method: 'post',
                url: '/hexagon/send-coins',
                data: { numericId: hexagonId },
              },
              onResponse: () =>
                setAlertPropsCallback({
                  type: 'green',
                  heading: 'The coins were successfully delivered to your wallet',
                }),
              onError: (error) =>
                setAlertPropsCallback({ type: 'red', heading: 'Error', text: error.response.data.message }),
            })
          }
        />
        <div>
          <h3 className="play-page-popup-content-heading">Owner</h3>
          <p className="play-page-popup-content-text">{hexagonInfo.owner}</p>
        </div>
        <Button
          className="play-page-popup-info-attack-button"
          text={'Attack'}
          disabled={!hexagonInfo.canAttack}
          appearance={{ priority: 'primary' }}
        />
      </div>
    </section>
  );
};
