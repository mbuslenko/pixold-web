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

const hexagonAttackText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Blandit ultricies aliquam quis in accumsan, vel ut.
                          Posuere suscipit neque scelerisque libero.
                          Quisque ipsum tristique arcu velit facilisi nec lectus.
                          Commodo sed elementum congue consequat.`;

const hexagonMinerText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Blandit ultricies aliquam quis in accumsan, vel ut.
                          Posuere suscipit neque scelerisque libero.
                          Quisque ipsum tristique arcu velit facilisi nec lectus.
                          Commodo sed elementum congue consequat.`;

const hexagonDefenderText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Blandit ultricies aliquam quis in accumsan, vel ut.
                          Posuere suscipit neque scelerisque libero.
                          Quisque ipsum tristique arcu velit facilisi nec lectus.
                          Commodo sed elementum congue consequat.`;

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
      <h2 className="hexagon-content-heading">There will be a header</h2>
      <div className="hexagon hexagon-attack" ref={hexagonAttackRef}>
        <HexagonSvg className="hexagon-icon-small" color="red" />
        <img src={hexagonRedImg} alt="" className="hexagon-icon-big" />
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
        <img src={hexagonBlueImg} alt="" className="hexagon-icon-big" />
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
        Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed
        elementum congue consequat.
      </div>
    </div>
  );
};
