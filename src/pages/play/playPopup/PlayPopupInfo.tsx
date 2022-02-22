import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { adjustDecimalLength } from '../../../shared/ts/helperFunctions';
import { prepareRequest } from '../../../shared/ts/clientCommunication';

import { addAlert } from '../../../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import { Button } from '../../../components/button/Button';

import { IPlayPopupInfoProps } from './interfaces';

import './PlayPopupInfo.scss';
import { levelNameAll, typeNameAll } from './hexagonInfoData';
import { PlayPopupInfoMaintenance } from './PlayPopupInfoMaintenance';

const adjustNumberLength = (number: number): string =>
  Number.isInteger(number) ? number.toString() : adjustDecimalLength(number, 4);

export const PlayPopupInfo: React.FC<IPlayPopupInfoProps> = ({
  hexagonId,
  hexagonInfo,
  setModalIsVisibleCallback,
  changeCoinsInStorageCallback,
  changeHealthCallback,
  changeTabCallback,
  drawAttackLineCallback,
}) => {
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.user.username);

  const navigate = useNavigate();
  const request = prepareRequest(navigate, dispatch);

  const [isRepairDisabled, setIsRepairDisabled] = useState(hexagonInfo.health === 100);

  const buttonClassName = hexagonInfo.owner !== username ? 'play-popup-info-button-hidden' : '';
  const canAttack = hexagonInfo.owner === username && hexagonInfo.type === 'attack';

  const sendCoinsCallback = () => {
    request({
      requestConfig: {
        method: 'post',
        url: '/hexagon/send-coins',
        data: { numericId: hexagonId },
      },
      onResponse: () => {
        dispatch(addAlert({ type: 'success', heading: 'The coins were successfully delivered to your wallet' }));
        changeCoinsInStorageCallback(0);
      },
      onError: (error) => dispatch(addAlert({ type: 'error', heading: error.response.data.message })),
    });
  };

  const repairCallback = () => {
    setIsRepairDisabled(true);

    request({
      requestConfig: {
        method: 'post',
        url: '/hexagon/repair',
        data: { numericId: hexagonId },
      },
      onResponse: () => {
        dispatch(addAlert({ type: 'success', heading: 'Hexagon was successfully repaired' }));
        changeHealthCallback(100);
      },
      onError: (error) => {
        setIsRepairDisabled(false);
        dispatch(addAlert({ type: 'error', heading: error.response.data.message }));
      },
    });
  };

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
          <p className="play-popup-content-text">{levelNameAll[hexagonInfo.level].value}</p>
        </div>
        <Button
          text={'Upgrade'}
          appearance={{ priority: 'secondary' }}
          className={buttonClassName}
          onClick={() => setModalIsVisibleCallback(true)}
          disabled={hexagonInfo.level === 'supreme'}
        />
        {hexagonInfo.type === 'miner' ? (
          <PlayPopupInfoMaintenance
            heading="Coins in storage"
            text={adjustNumberLength(hexagonInfo.coinsInStorage)}
            buttonText="Send to my wallet"
            buttonClassName={buttonClassName}
            isDisabledButton={hexagonInfo.coinsInStorage === 0}
            buttonCallback={sendCoinsCallback}
          />
        ) : hexagonInfo.type === 'defender' || hexagonInfo.type === 'attack' ? (
          <PlayPopupInfoMaintenance
            heading="Health"
            text={adjustNumberLength(hexagonInfo.health)}
            buttonText="Repair"
            buttonClassName={buttonClassName}
            isDisabledButton={isRepairDisabled}
            buttonCallback={repairCallback}
          />
        ) : (
          <></>
        )}
        <div className="play-popup-content-owner-wrapper">
          <div className="play-popup-content-owner">
            <h3 className="play-popup-content-heading">Owner</h3>
            <p className="play-popup-content-text">{hexagonInfo.owner}</p>
          </div>

          <Button
            className={buttonClassName}
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
