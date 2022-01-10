import React from 'react';
import { useRef, useState } from 'react';

import { ScreenMaxWidth } from '../../shared/ts/enums';
import { blockScrolling, isScreen, unblockScrolling } from '../../shared/ts/helperFunctions';

import { Button } from '../../components/button/Button';
import { IModalPosition } from '../../components/interfaces';
import { Modal } from '../../components/modal/Modal';
import { ModalPositionType } from '../../components/types';
import { HexagonSvg } from '../../components/hexagonSvg/HexagonSvg';

import './HomeHexagonsScreen.scss';
import hexagonRedImg from '../../assets/svg/hexagon-red.svg';
import hexagonBlueImg from '../../assets/svg/hexagon-blue.svg';

const hexagonAttackHeading = 'Attack';
const hexagonMinerHeading = 'Miner';
const hexagonDefenderHeading = 'Defender';

const hexagonAttackText = `Its main function is to attack and rob. 
                          With this hexagon you can take all the mined coins from your 
                          enemies or simply disable them. With its pumping, the speed 
                          of passing the hexagons will increase, and with it the chance 
                          of a successful attack.`;

const hexagonMinerText = `The main hexagon in the game. Every hour, with some chance, 
                          it will mine coins for you, collecting them in its vault. You can 
                          spend them on the needs of this or other hexagons, or transfer them 
                          to another cryptocurrency. Along with pumping, the chance of 
                          mining and the amount of production increase.`;

const hexagonDefenderText = `The defender ensures the safety of the rest of hexagons from attacking 
                          enemies. Without them, looting your miners and incapacitating the 
                          attackers will be a matter of a few minutes. Each level of pumping 
                          increases the chance of repelling an attack and also slows it down, 
                          which allows you to quickly take action to save the mined coins.`;

export const HomeHexagonsScreen: React.FC = () => {
  const [modalPositionType, setModalPositionType] = useState<ModalPositionType>('absolute');
  const [modalPosition, setModalPosition] = useState<IModalPosition>();
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');
  const hexagonAttackRef = useRef<HTMLDivElement>(null);
  const hexagonMinerRef = useRef<HTMLDivElement>(null);
  const hexagonDefenderRef = useRef<HTMLDivElement>(null);

  const isHexagonOnPosition = (hexagon: HTMLDivElement, x: number, y: number): boolean => {
    const inRangeX: boolean = y >= hexagon.offsetTop && y <= hexagon.offsetTop + hexagon.offsetHeight;
    const inRangeY: boolean = x >= hexagon.offsetLeft && x <= hexagon.offsetLeft + hexagon.offsetWidth;

    return inRangeX && inRangeY;
  };

  const setInfoModalPosition = (x: number, y: number): void => {
    setModalPosition({
      left: `${x < window.innerWidth / 2 ? x + 20 : x - 553}px`,
      top: `${y}px`,
    });
  };

  const isScreenMedium = (): boolean => isScreen(ScreenMaxWidth.MEDIUM);

  const showInfoModal = (modalHeading: string, modalText: string): void => {
    setModalHeading(modalHeading);
    setModalText(modalText);
    setModalVisibility(true);

    if (isScreenMedium()) {
      setModalPosition({
        top: '10%',
        left: '0',
      });
      setModalPositionType('fixed');
      blockScrolling();
    }
  };

  const hideInfoModal = (): void => {
    setModalVisibility(false);

    if (isScreenMedium()) {
      setModalPositionType('absolute');
      unblockScrolling();
    }
  };

  const mouseMoveCallback = (e: React.MouseEvent): void => {
    if (isScreenMedium()) {
      return;
    }

    const { current: hexagonAttackDom } = hexagonAttackRef;
    const { current: hexagonDefenderDom } = hexagonDefenderRef;
    const { current: hexagonMinerDom } = hexagonMinerRef;

    if (!hexagonAttackDom || !hexagonDefenderDom || !hexagonMinerDom) {
      return;
    }

    if (isHexagonOnPosition(hexagonAttackDom, e.pageX, e.pageY)) {
      setInfoModalPosition(e.pageX, e.pageY);
      showInfoModal(hexagonAttackHeading, hexagonAttackText);

      return;
    }

    if (isHexagonOnPosition(hexagonMinerDom, e.pageX, e.pageY)) {
      setInfoModalPosition(e.pageX, e.pageY);
      showInfoModal(hexagonMinerHeading, hexagonMinerText);

      return;
    }

    if (isHexagonOnPosition(hexagonDefenderDom, e.pageX, e.pageY)) {
      setInfoModalPosition(e.pageX, e.pageY);
      showInfoModal(hexagonDefenderHeading, hexagonDefenderText);

      return;
    }

    hideInfoModal();
  };

  return (
    <div className="hexagon-content" onMouseMove={(e) => mouseMoveCallback(e)}>
      {isModalVisible && (
        <Modal
          heading={modalHeading}
          text={modalText}
          positionType={modalPositionType}
          position={modalPosition}
          theme="blue-dark"
          className="hexagon-info-modal"
        >
          {isScreenMedium() && (
            <Button
              text={'Got it!'}
              appearance={{ priority: 'secondary', theme: 'black-white' }}
              onClick={hideInfoModal}
            />
          )}
        </Modal>
      )}
      <h2 className="hexagon-content-heading">Hexagons</h2>
      <div className="hexagon hexagon-attack" ref={hexagonAttackRef}>
        <HexagonSvg className="hexagon-icon-small" color="red" />
        <img src={hexagonRedImg} alt='' className="hexagon-icon-big" />
        <div className="hexagon-title">Attack</div>
        <div className="hexagon-btn">
          <Button
            text="Read more"
            appearance={{ priority: 'secondary', theme: 'red' }}
            onClick={() => showInfoModal(hexagonAttackHeading, hexagonAttackText)}
          />
        </div>
      </div>
      <div className="hexagon hexagon-miner" ref={hexagonMinerRef}>
        <HexagonSvg color="yellow" className="hexagon-icon" />
        <div className="hexagon-title">Miner</div>
        <div className="hexagon-btn">
          <Button
            text="Read more"
            appearance={{ priority: 'secondary', theme: 'yellow' }}
            onClick={() => showInfoModal(hexagonMinerHeading, hexagonMinerText)}
          />
        </div>
      </div>
      <div className="hexagon hexagon-defender" ref={hexagonDefenderRef}>
        <HexagonSvg color="blue" className="hexagon-icon-small" />
        <img src={hexagonBlueImg} alt='' className="hexagon-icon-big" />
        <div className="hexagon-title">Defender</div>
        <div className="hexagon-btn">
          <Button
            text="Read more"
            appearance={{ priority: 'secondary', theme: 'blue' }}
            onClick={() => showInfoModal(hexagonDefenderHeading, hexagonDefenderText)}
          />
        </div>
      </div>
      <div className="hexagon-content-desc">
      Hexagons are the main characters of this performance. You can purchase — as much as your heart desires, but the total amount is limited by the limits of the map. After purchase, you can choose the type and pump them to improve the characteristics.
      </div>
    </div>
  );
};
