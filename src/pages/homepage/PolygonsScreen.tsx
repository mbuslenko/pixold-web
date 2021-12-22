import React from 'react';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui-kit/button/Button';
import { IModalPosition } from '../../components/ui-kit/interfaces';
import { Modal } from '../../components/ui-kit/modal/Modal';
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
  const [modalPosition, setModalPosition] = useState<IModalPosition | undefined>();
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');
  const polygonAttackRef = useRef<HTMLDivElement>(null);
  const polygonMinerRef = useRef<HTMLDivElement>(null);
  const polygonDefenderRef = useRef<HTMLDivElement>(null);

  const isPolygonOnPosition = (polygon: HTMLDivElement, x: number, y: number): boolean => (
    y >= polygon.offsetTop && y <= polygon.offsetTop + polygon.offsetHeight &&
    x >= polygon.offsetLeft && x <= polygon.offsetLeft + polygon.offsetWidth
  );

  const setInfoModalPosition = (x: number, y: number): void => {
    setModalPosition({
      x: x < window.innerWidth / 2 ? (x + 20) : (x - 553),
      y: y,
    });
  };

  const showInfoModal = (modalHeading: string, modalText: string): void => {
    setModalHeading(modalHeading);
    setModalText(modalText);
    setModalVisibility(true);

    if (window.innerWidth < 425) {
      // I block/unblock scrolling this way (not with pure css) so every device would work same
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
    }
  };

  const hideInfoModal = (): void => {
    // Reason why I setModalPosition(undefined):
    // If you are in desktop mode and hover over polygon - modal will set it's positions.
    // After going to mobile mode - position will be from desktop
    // and css class with media query positions won't work
    setModalPosition(undefined);
    setModalVisibility(false);

    if (window.innerWidth < 425) {
      document.body.style.position = '';
      window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
      document.body.style.top = '';
    }
  };

  const mouseMoveCallback = (e: React.MouseEvent): void => {
    if (window.innerWidth < 425) {
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

    if (isPolygonOnPosition(polygonDefenderDom, e.pageX, e.pageY)) {
      setInfoModalPosition(e.pageX, e.pageY);
      showInfoModal(polygonMinerHeading, polygonMinerText);

      return;
    }

    if (isPolygonOnPosition(polygonMinerDom, e.pageX, e.pageY)) {
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
            position={modalPosition}
            positionClassName='info-modal-position'
            colorsClassName='info-modal-colors'
            sizeClassName='info-modal-size'
          >
            {window.innerWidth < 425 &&
              <Button
                text={'Got it!'}
                priority='primary'
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
                priority='secondary'
                className='polygon-btn-red'
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
                priority='secondary'
                className='polygon-btn-yellow'
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
                priority='secondary'
                className='polygon-btn-blue'
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
