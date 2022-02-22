import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HexagonInfoType } from '../../../shared/ts/types';
import { prepareRequest } from '../../../shared/ts/clientCommunication';

import { addAlert } from '../../../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import { TabbedButtonGroup } from '../../../components/tabbedButtonGroup/TabbedButtonGroup';
import { Loader } from '../../../components/loader/Loader';
import { Button } from '../../../components/button/Button';
import { Modal } from '../../../components/modal/Modal';

import './PlayPopup.scss';
import { IPlayPopupProps } from './interfaces';
import { PlayPopupInfo } from './PlayPopupInfo';
import { PlayPopupLevel } from './PlayPopupLevel';
import { PlayPopupSettings } from './PlayPopupSettings';

const tabAll = [
  { text: 'Info', value: 'info' },
  { text: 'Level', value: 'level' },
  { text: 'Settings', value: 'settings' },
];

export const PlayPopup: React.FC<IPlayPopupProps> = ({
  hexagonId,
  hexagonInfo,
  setHexagonInfo,
  closePopupCallback,
  drawAttackLineCallback,
}) => {
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.user.username);

  const request = prepareRequest(useNavigate(), dispatch);

  const [selectedTab, setSelectedTab] = useState('info');
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const changeHexagonTypeCallback = (newHexagonType?: HexagonInfoType) => {
    if (!newHexagonType) {
      return;
    }

    request({
      requestConfig: {
        method: 'post',
        url: '/hexagon/change-type',
        data: { numericId: hexagonId, type: newHexagonType },
      },
      onResponse: () => {
        dispatch(addAlert({ type: 'success', heading: 'Type was changed successfully' }));

        if (!hexagonInfo) {
          return;
        }

        const newHexagonInfo = { ...hexagonInfo, type: newHexagonType };

        newHexagonInfo.level = 'starter';

        if (newHexagonType === 'miner') {
          newHexagonInfo.coinsInStorage = 0;
        } else {
          newHexagonInfo.health = 100;
        }

        setHexagonInfo(newHexagonInfo);
      },
      onError: (error) => dispatch(addAlert({ type: 'error', heading: error.response.data.message })),
    });
  };

  const upgradeResponseCallback = () => {
    if (hexagonInfo) {
      const newHexagonInfo = {
        ...hexagonInfo,
        // HACK: after back-end change logic
        // level: getNextItem(Object.entries(levelNameAll), HexagonLevelType[hexagonInfo.level])[0],
      };

      setHexagonInfo(newHexagonInfo);
      dispatch(addAlert({ type: 'success', heading: 'Hexagon was upgraded successfully!' }));
    }
  };

  const modalUpgradeCallback = () => {
    request({
      requestConfig: {
        method: 'post',
        url: '/hexagon/upgrade',
        data: { numericId: hexagonId },
      },
      onResponse: upgradeResponseCallback,
      onError: (error) => dispatch(addAlert({ type: 'error', heading: error.response.data.message })),
    });
    setModalIsVisible(false);
  };

  useEffect(() => {
    setSelectedTab('info');
  }, [hexagonId]);

  return (
    <section className="play-popup">
      <div className="play-popup-menu">
        <TabbedButtonGroup
          name={'play-menu-popup-tab'}
          value={selectedTab}
          options={tabAll}
          onChange={(value) => setSelectedTab(value)}
          disabled={hexagonInfo?.owner !== username}
        />
        <button className="play-page-close-popup-button" onClick={closePopupCallback}>
          X
        </button>
      </div>

      {!hexagonInfo ? (
        <Loader className="play-popup-loader" />
      ) : selectedTab === 'level' ? (
        <PlayPopupLevel setModalIsVisibleCallback={setModalIsVisible} hexagonInfo={hexagonInfo} />
      ) : selectedTab === 'settings' ? (
        <PlayPopupSettings hexagonInfo={hexagonInfo} changeHexagonTypeCallback={changeHexagonTypeCallback} />
      ) : (
        <PlayPopupInfo
          setModalIsVisibleCallback={setModalIsVisible}
          hexagonInfo={hexagonInfo}
          hexagonId={hexagonId}
          changeTabCallback={(tab) => setSelectedTab(tab)}
          changeCoinsInStorageCallback={(coinsInStorage: number) => setHexagonInfo({ ...hexagonInfo, coinsInStorage })}
          changeHealthCallback={(health: number) => setHexagonInfo({ ...hexagonInfo, health })}
          drawAttackLineCallback={() => drawAttackLineCallback(hexagonId)}
        />
      )}

      {modalIsVisible && hexagonInfo && (
        <Modal
          heading={`An upgrade will take ${hexagonInfo.coinsToUpgrade} coins from your wallet, are you sure?`}
          className="play-popup-modal"
        >
          <Button text={'Submit'} appearance={{ priority: 'primary' }} onClick={modalUpgradeCallback} />
          <Button text={'Cancel'} appearance={{ priority: 'secondary' }} onClick={() => setModalIsVisible(false)} />
        </Modal>
      )}
    </section>
  );
};
