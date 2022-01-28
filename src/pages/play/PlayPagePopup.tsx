import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { IGetResponseHexagonInfo } from '../../shared/ts/interfaces';
import { GetResponseHexagonInfo, HexagonInfoType } from '../../shared/ts/types';

import { TabbedButtonGroup } from '../../components/tabbedButtonGroup/TabbedButtonGroup';
import { Alert } from '../../components/alert/Alert';
import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';
import { IAlertProps } from '../../components/interfaces';
import { Loader } from '../../components/loader/Loader';

import './PlayPagePopup.scss';
import { IPlayPagePopupProps } from './interfaces';
import { PlayPagePopupInfo } from './PlayPagePopupInfo';
import { PlayPagePopupLevel } from './PlayPagePopupLevel';
import { PlayPagePopupSettings } from './PlayPagePopupSettings';

export const PlayPagePopup: React.FC<IPlayPagePopupProps> = ({ hexagonId, closePopupCallback }) => {
  const navigate = useNavigate();
  const [hexagonInfo, setHexagonInfo] = useState<IGetResponseHexagonInfo | null>(null);
  const [alertProps, setAlertProps] = useState<IAlertProps | null>(null);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('info');

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
        setAlertProps({ type: 'green', heading: 'Type was changed successfully' });
        hexagonInfo && setHexagonInfo({ ...hexagonInfo, type: newHexagonType });
      },
      onError: (error) => setAlertProps({ type: 'red', heading: 'Error', text: error.response.data.message }),
    });
  };

  return (
    <section className="play-page-popup">
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
      <div className="play-page-popup-menu">
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
        <PlayPagePopupLevel setModalIsVisibleCallback={setModalIsVisible} hexagonInfo={hexagonInfo} />
      ) : hexagonInfo && selectedTab === 'settings' ? (
        <PlayPagePopupSettings
          hexagonInfo={hexagonInfo}
          changeHexagonTypeCallback={changeHexagonTypeCallback}
          setAlertPropsCallback={setAlertProps}
        />
      ) : hexagonInfo && selectedTab === 'info' ? (
        <PlayPagePopupInfo
          setModalIsVisibleCallback={setModalIsVisible}
          setAlertPropsCallback={setAlertProps}
          hexagonInfo={hexagonInfo}
          hexagonId={hexagonId}
          changeTabCallback={(tab) => setSelectedTab(tab)}
        />
      ) : (
        <Loader />
      )}
      {modalIsVisible && (
        <Modal
          heading={`An upgrade will take ${hexagonInfo?.coinsToUpgrade} coins from your wallet, are you sure?`}
          text=""
          className="play-page-popup-modal"
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
                onResponse: () => setAlertProps({ type: 'green', heading: 'success' }),
                onError: (error) => {
                  setAlertProps({ type: 'red', heading: 'Error', text: error.response.data.message });
                  console.log(error);
                },
              });
              setModalIsVisible(false);
            }}
          />
          <Button text={'Cancel'} appearance={{ priority: 'secondary' }} onClick={() => setModalIsVisible(false)} />
        </Modal>
      )}
      {alertProps && <Alert {...alertProps} onClick={() => setAlertProps(null)} />}
    </section>
  );
};
