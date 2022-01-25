import React, { useEffect, useState } from 'react';

import { TabbedButtonGroup } from '../../components/tabbedButtonGroup/TabbedButtonGroup';

import './PlayPagePopup.scss';
import { IPlayPagePopupProps } from './interfaces';
import { PlayPagePopupInfo } from './PlayPagePopupInfo';
import { PlayPagePopupLevel } from './PlayPagePopupLevel';
import { PlayPagePopupSettings } from './PlayPagePopupSettings';
import { Alert } from '../../components/alert/Alert';
import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';
import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { IAlertProps } from '../../components/interfaces';
import { IGetResponseHexagonInfo } from '../../shared/ts/interfaces';
import { GetResponseHexagonInfo } from '../../shared/ts/types';

export const PlayPagePopup: React.FC<IPlayPagePopupProps> = ({ hexagonId = 1, closePopupCallback }) => {
  const navigate = useNavigate();
  const [infoIsVisible, setInfoIsVisible] = useState(false);
  const [alertProps, setAlertProps] = useState<IAlertProps | null>(null);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [hexagonInfo, setHexagonInfo] = useState<IGetResponseHexagonInfo>();
  const [selectedTab, setSelectedTab] = useState<string>('info');

  // FIXME: on start mount it sends to requests. first for hexagonId === 1, second with actual hexagonId
  useEffect(() => {
    getAxiosInstance(navigate)({
      requestConfig: {
        method: 'get',
        url: `/hexagon/${hexagonId}`,
      },
      onResponse: (response: GetResponseHexagonInfo) => {
        console.log(response.data);
        setHexagonInfo(response.data);
        setInfoIsVisible(true);
      },
    });
  }, [hexagonId, navigate]);

  const changeHexagonTypeCallback = (newHexagonType?: string) => {
    if (!newHexagonType) {
      return;
    }

    getAxiosInstance(navigate)({
      requestConfig: {
        method: 'post',
        url: '/hexagon/change-type',
        data: { numericId: hexagonId, type: newHexagonType },
      },
      onResponse: () => setAlertProps({ type: 'green', heading: 'Type was changed successfully' }),
      onError: ({ message }) => setAlertProps({ type: 'red', heading: 'Error', text: message }),
    });
  };

  return (
    <section className="play-page-popup">
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
      {infoIsVisible && selectedTab === 'level' ? (
        <PlayPagePopupLevel setModalIsVisibleCallback={setModalIsVisible} hexagonInfo={hexagonInfo} />
      ) : selectedTab === 'settings' ? (
        <PlayPagePopupSettings changeHexagonTypeCallback={changeHexagonTypeCallback} setAlertPropsCallback={setAlertProps} />
      ) : selectedTab === 'info' ? (
        <PlayPagePopupInfo
          setModalIsVisibleCallback={setModalIsVisible}
          setAlertPropsCallback={setAlertProps}
          hexagonInfo={hexagonInfo}
          hexagonId={hexagonId}
          changeTabCallback={(tab) => setSelectedTab(tab)}
        />
      ) : (
        <></>
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
                  // FIXME: error message isn't right
                  setAlertProps({ type: 'red', heading: 'Error', text: error.message });
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
