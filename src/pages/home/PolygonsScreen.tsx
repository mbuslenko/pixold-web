import React from 'react';
import { useRef, useState } from 'react';
import { Button } from '../../components/button/Button';
import { IModalPosition } from '../../components/interfaces';
import { Modal } from '../../components/modal/Modal';
import { ModalPositionType } from '../../components/type';
import { blockScrolling, isSmallScreen, unblockScrolling } from '../../shared/ts/helperFunctions';
import './PolygonsScreen.scss';

const polygonAttackHeading = 'Attack';
const polygonMinerHeading = 'Miner';
const polygonDefenderHeading = 'Defender';

const polygonAttackText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Blandit ultricies aliquam quis in accumsan, vel ut.
                          Posuere suscipit neque scelerisque libero.
                          Quisque ipsum tristique arcu velit facilisi nec lectus.
                          Commodo sed elementum congue consequat.`;

const polygonMinerText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Blandit ultricies aliquam quis in accumsan, vel ut.
                          Posuere suscipit neque scelerisque libero.
                          Quisque ipsum tristique arcu velit facilisi nec lectus.
                          Commodo sed elementum congue consequat.`;

const polygonDefenderText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Blandit ultricies aliquam quis in accumsan, vel ut.
                          Posuere suscipit neque scelerisque libero.
                          Quisque ipsum tristique arcu velit facilisi nec lectus.
                          Commodo sed elementum congue consequat.`;

export const PolygonsScreen: React.FC = () => {
  const [modalPositionType, setModalPositionType] = useState<ModalPositionType>('absolute');
  const [modalPosition, setModalPosition] = useState<IModalPosition>();
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');
  const polygonAttackRef = useRef<HTMLDivElement>(null);
  const polygonMinerRef = useRef<HTMLDivElement>(null);
  const polygonDefenderRef = useRef<HTMLDivElement>(null);

  const isPolygonOnPosition = (polygon: HTMLDivElement, x: number, y: number): boolean => {
    const inRangeX: boolean = (y >= polygon.offsetTop) && (y <= polygon.offsetTop + polygon.offsetHeight);
    const inRangeY: boolean = (x >= polygon.offsetLeft) && (x <= polygon.offsetLeft + polygon.offsetWidth);

    return inRangeX && inRangeY;
  };

  const setInfoModalPosition = (x: number, y: number): void => {
    setModalPosition({
      left: `${x < window.innerWidth / 2 ? (x + 20) : (x - 553)}px`,
      top: `${y}px`,
    });
  };

  const showInfoModal = (modalHeading: string, modalText: string): void => {
    setModalHeading(modalHeading);
    setModalText(modalText);
    setModalVisibility(true);

    if (isSmallScreen()) {
      setModalPosition({
        top: '10%',
        left: 'calc(50% - 172px)',
      });
      setModalPositionType('fixed');
      blockScrolling();
    }
  };

  const hideInfoModal = (): void => {
    setModalVisibility(false);

    if (isSmallScreen()) {
      setModalPositionType('absolute');
      unblockScrolling();
    }
  };

  const mouseMoveCallback = (e: React.MouseEvent): void => {
    if (isSmallScreen()) {
      return;
    }

    const { current: polygonAttackDom } = polygonAttackRef;
    const { current: polygonDefenderDom } = polygonDefenderRef;
    const { current: polygonMinerDom } = polygonMinerRef;

    if (!polygonAttackDom || !polygonDefenderDom || !polygonMinerDom) {
      return;
    }

    if (isPolygonOnPosition(polygonAttackDom, e.pageX, e.pageY)) {
      setInfoModalPosition(e.pageX, e.pageY);
      showInfoModal(polygonAttackHeading, polygonAttackText);

      return;
    }

    if (isPolygonOnPosition(polygonMinerDom, e.pageX, e.pageY)) {
      setInfoModalPosition(e.pageX, e.pageY);
      showInfoModal(polygonMinerHeading, polygonMinerText);

      return;
    }

    if (isPolygonOnPosition(polygonDefenderDom, e.pageX, e.pageY)) {
      setInfoModalPosition(e.pageX, e.pageY);
      showInfoModal(polygonDefenderHeading, polygonDefenderText);

      return;
    }

    hideInfoModal();
  };

  return (
    <section className="polygons">
      <div
        className="container"
        onMouseMove={(e) => mouseMoveCallback(e)}
      >
        { isModalVisible &&
          <Modal
            heading={modalHeading}
            text={modalText}
            positionType={modalPositionType}
            position={modalPosition}
            theme='blue-dark'
            addedClasses='polygon-info-modal'
          >
            {isSmallScreen() &&
              <Button
                text={'Got it!'}
                appearance={{ priority: 'secondary', theme: 'black-white' }}
                onClick={hideInfoModal}
              />
            }
          </Modal>
        }
        <div className="polygons-content">
          <h2 className="info-title polygon-title">There will be a header</h2>
          <div
            className="polygon-attack"
            ref={polygonAttackRef}
          >
            <div className="polygon-attack-bg"></div>
            <div className="polygon-title-card">Attack</div>
            <div className="polygon-btn">
              <Button
                text="Read more"
                appearance={{ priority: 'secondary', theme: 'red' }}
                onClick={() => showInfoModal(polygonAttackHeading, polygonAttackText)}
              />
            </div>
          </div>
          <div
            className="polygon-miner"
            ref={polygonMinerRef}
          >
            <div className="polygon-miner-bg"></div>
            <div className="polygon-title-card">Miner</div>
            <div className="polygon-btn">
              <Button
                text="Read more"
                appearance={{ priority: 'secondary', theme: 'yellow' }}
                onClick={() => showInfoModal(polygonMinerHeading, polygonMinerText)}
              />
            </div>
          </div>
          <div
            className="polygon-defender"
            ref={polygonDefenderRef}
          >
            <div className="polygon-defender-bg"></div>
            <div className="polygon-title-card">Defender</div>
            <div className="polygon-btn">
              <Button
                text="Read more"
                appearance={{ priority: 'secondary', theme: 'blue' }}
                onClick={() => showInfoModal(polygonDefenderHeading, polygonDefenderText)}
              />
            </div>
          </div>
          <div className="polygon-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel
            ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus.
            Commodo sed elementum congue consequat.
          </div>
        </div>
      </div>
    </section>
  );
};
