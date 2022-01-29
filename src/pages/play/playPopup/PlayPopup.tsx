import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAxiosInstance } from '../../../shared/ts/axiosInstance';
import { IGetResponseHexagonInfo } from '../../../shared/ts/interfaces';
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

export const PlayPopup: React.FC<IPlayPopupProps> = ({ hexagonId, closePopupCallback, setAlertPropsCallback }) => {
  const navigate = useNavigate();
  const [hexagonInfo, setHexagonInfo] = useState<IGetResponseHexagonInfo | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('info');
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setHexagonInfo(null);

    getAxiosInstance(navigate)({
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

    getAxiosInstance(navigate)({
      requestConfig: {
        method: 'post',
        url: '/hexagon/change-type',
        data: { numericId: hexagonId, type: newHexagonType },
      },
      onResponse: () => {
        setAlertPropsCallback({ type: 'success', heading: 'Type was changed successfully' });
        hexagonInfo && setHexagonInfo({ ...hexagonInfo, type: newHexagonType });
      },
      onError: (error) => setAlertPropsCallback({ type: 'error', heading: 'Error', text: error.response.data.message }),
    });
  };

  return (
    <section className="play-popup">
      {/* HACK: test */}
      <button
        onClick={() =>
          getAxiosInstance(navigate)({
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
          // HACK: test
          // disabled={hexagonInfo?.owner !== localStorage.getItem('username')}
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
          setAlertPropsCallback={setAlertPropsCallback}
        />
      ) : hexagonInfo && selectedTab === 'info' ? (
        <PlayPopupInfo
          setModalIsVisibleCallback={setModalIsVisible}
          setAlertPropsCallback={setAlertPropsCallback}
          hexagonInfo={hexagonInfo}
          hexagonId={hexagonId}
          changeTabCallback={(tab) => setSelectedTab(tab)}
        />
      ) : (
        <Loader className="play-popup-loader" />
      )}
      {modalIsVisible && (
        <Modal
          heading={`An upgrade will take ${hexagonInfo?.coinsToUpgrade} coins from your wallet, are you sure?`}
          text=""
          className="play-popup-modal"
        >
          <Button
            text={'Submit'}
            appearance={{ priority: 'primary' }}
            onClick={() => {
              getAxiosInstance(navigate)({
                requestConfig: {
                  method: 'post',
                  url: '/hexagon/upgrade',
                  data: { numericId: hexagonId },
                },
                onResponse: () => setAlertPropsCallback({ type: 'success', heading: 'success' }),
                onError: (error) => {
                  setAlertPropsCallback({ type: 'error', heading: 'Error', text: error.response.data.message });
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
