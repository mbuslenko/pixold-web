import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HexagonLevel, IGetResponseHexagonInfo } from '../../../shared/ts/interfaces';
import { GetResponseHexagonInfo, HexagonInfoType } from '../../../shared/ts/types';

import { TabbedButtonGroup } from '../../../components/tabbedButtonGroup/TabbedButtonGroup';
import { Loader } from '../../../components/loader/Loader';

import './PlayPopup.scss';
import { IPlayPopupProps } from './interfaces';
import { PlayPopupInfo } from './PlayPopupInfo';
import { PlayPopupLevel } from './PlayPopupLevel';
import { PlayPopupSettings } from './PlayPopupSettings';
import { Button } from '../../../components/button/Button';
import { Modal } from '../../../components/modal/Modal';
import { client } from '../../../shared/ts/ClientCommunication';
import { getNextItem, levelNameAll } from './hexagonInfoData';

export const PlayPopup: React.FC<IPlayPopupProps> = ({ hexagonId, closePopupCallback, drawAttackLineCallback }) => {
  const navigate = useNavigate();
  const [hexagonInfo, setHexagonInfo] = useState<IGetResponseHexagonInfo | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('info');
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setHexagonInfo(null);

    client.prepareRequest(navigate)({
      requestConfig: {
        method: 'get',
        url: `/hexagon/${hexagonId}`,
      },
      onResponse: (response: GetResponseHexagonInfo) => {
        console.log(response.data);
        setHexagonInfo(response.data);
      },
    });
  }, [hexagonId, navigate]);

  const changeHexagonTypeCallback = (newHexagonType?: HexagonInfoType) => {
    if (!newHexagonType) {
      return;
    }

    client.prepareRequest(navigate)({
      requestConfig: {
        method: 'post',
        url: '/hexagon/change-type',
        data: { numericId: hexagonId, type: newHexagonType },
      },
      onResponse: (_, triggerAlertCallback) => {
        triggerAlertCallback('Type was changed successfully');
        hexagonInfo && setHexagonInfo({ ...hexagonInfo, type: newHexagonType });
      },
      onError: (error, triggerAlertCallback) => triggerAlertCallback(error.response.data.message),
    });
  };

  // TODO: make interface for parameters
  const upgradeResponseCallback = (_: any, triggerAlertCallback: (message: string) => void) => {
    if (hexagonInfo) {
      const newHexagonInfo = { ...hexagonInfo, level: getNextItem(Object.entries(levelNameAll), HexagonLevel[hexagonInfo.level])[0] };

      setHexagonInfo(newHexagonInfo);
      triggerAlertCallback('Hexagon was upgraded successfully!');
    }
  };

  return (
    <section className="play-popup">
      {/* HACK: test */}
      <button
        onClick={() =>
          client.prepareRequest(navigate)({
            requestConfig: {
              method: 'post',
              url: '/hexagon/buy',
              data: {
                numericId: hexagonId,
                userId: localStorage.getItem('userId') as string,
              },
            },
            onResponse: () => console.log(';)'),
          })
        }
      >
        Buy
      </button>
      <div className="play-popup-menu">
        <TabbedButtonGroup
          name={'play-menu-popup-tab'}
          value={selectedTab}
          options={[
            { text: 'Info', value: 'info' },
            { text: 'Level', value: 'level' },
            { text: 'Settings', value: 'settings' },
          ]}
          onChange={(value) => setSelectedTab(value)}
          disabled={hexagonInfo?.owner !== localStorage.getItem('username')}
        />
        <button className="play-page-close-popup-button" onClick={closePopupCallback}>
          X
        </button>
      </div>
      {hexagonInfo && selectedTab === 'level' ? (
        <PlayPopupLevel setModalIsVisibleCallback={setModalIsVisible} hexagonInfo={hexagonInfo} />
      ) : hexagonInfo && selectedTab === 'settings' ? (
        <PlayPopupSettings
          hexagonInfo={hexagonInfo}
          changeHexagonTypeCallback={changeHexagonTypeCallback}
        />
      ) : hexagonInfo && selectedTab === 'info' ? (
        <PlayPopupInfo
          setModalIsVisibleCallback={setModalIsVisible}
          hexagonInfo={hexagonInfo}
          hexagonId={hexagonId}
          changeTabCallback={(tab) => setSelectedTab(tab)}
          changeCoinsInStorageCallback={(coinsInStorage: number) => { setHexagonInfo({ ...hexagonInfo, coinsInStorage }); }}
          changeHealthCallback={(health: number) => { setHexagonInfo({ ...hexagonInfo, health });}}
          drawAttackLineCallback={drawAttackLineCallback}
        />
      ) : (
        <Loader className="play-popup-loader" />
      )}
      {modalIsVisible && hexagonInfo && (
        <Modal
          heading={`An upgrade will take ${hexagonInfo.coinsToUpgrade} coins from your wallet, are you sure?`}
          text=""
          className="play-popup-modal"
        >
          <Button
            text={'Submit'}
            appearance={{ priority: 'primary' }}
            onClick={() => {
              client.prepareRequest(navigate)({
                requestConfig: {
                  method: 'post',
                  url: '/hexagon/upgrade',
                  data: { numericId: hexagonId },
                },
                onResponse: upgradeResponseCallback,
                onError: (error, triggerAlertCallback) => {
                  triggerAlertCallback(error.response.data.message);
                  console.log(error);
                },
              });
              setModalIsVisible(false);
            }}
          />
          <Button text={'Cancel'} appearance={{ priority: 'secondary' }} onClick={() => setModalIsVisible(false)} />
        </Modal>
      )}
    </section>
  );
};
