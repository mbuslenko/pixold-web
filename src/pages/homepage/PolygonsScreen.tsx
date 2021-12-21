import React from 'react';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui-kit/button/Button';
import { IPosition } from '../../components/ui-kit/interfaces';
import { Modal } from '../../components/ui-kit/modal/Modal';

const polygonAttackHeading = 'Attack red';
const polygonAttackText = 'RED GO FAAAAAAAAAAASTER!!!!!!!!!!';
const polygonMinerHeading = 'Miner yellow';
const polygonMinerText = 'WORK AGAIN ?!';
const polygonDefenderHeading = 'Defender Blue';
const polygonDefenderText = 'Just boring capitalism...';

export const PolygonsScreen: React.FC = () => {
  const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 });
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');
  const polygonAttackRef = useRef<HTMLDivElement>(null);
  const polygonMinerRef = useRef<HTMLDivElement>(null);
  const polygonDefenderRef = useRef<HTMLDivElement>(null);

  const mouseMoveCallback = (e: React.MouseEvent): void => {
    // TODO: need to refactor if {} statements
    if (window.innerWidth < 425) {
      return;
    }

    const { current: polygonAttackDom } = polygonAttackRef;

    if (!polygonAttackDom) {
      return;
    }

    if (
      e.pageY >= polygonAttackDom.offsetTop && e.pageY <= polygonAttackDom.offsetTop + polygonAttackDom.offsetHeight &&
      e.pageX >= polygonAttackDom.offsetLeft && e.pageX <= polygonAttackDom.offsetLeft + polygonAttackDom.offsetWidth
    ) {
      setModalHeading(polygonAttackHeading);
      setModalText(polygonAttackText);
      setModalVisibility(true);
      setPosition({
        x: e.pageX < window.innerWidth / 2 ? (e.pageX + 20) : (e.pageX - 553),
        y: e.pageY,
      });

      return;
    }

    const { current: polygonMinerDom } = polygonMinerRef;

    if (!polygonMinerDom) {
      return;
    }

    if (
      e.pageY >= polygonMinerDom.offsetTop && e.pageY <= polygonMinerDom.offsetTop + polygonMinerDom.offsetHeight &&
      e.pageX >= polygonMinerDom.offsetLeft && e.pageX <= polygonMinerDom.offsetLeft + polygonMinerDom.offsetWidth
    ) {
      setModalHeading(polygonMinerHeading);
      setModalText(polygonMinerText);
      setModalVisibility(true);
      setPosition({
        x: e.pageX < window.innerWidth / 2 ? (e.pageX + 20) : (e.pageX - 553),
        y: e.pageY,
      });

      return;
    }

    const { current: polygonDefenderDom } = polygonDefenderRef;

    if (!polygonDefenderDom) {
      return;
    }

    if (
      e.pageY >= polygonDefenderDom.offsetTop && e.pageY <= polygonDefenderDom.offsetTop + polygonDefenderDom.offsetHeight &&
      e.pageX >= polygonDefenderDom.offsetLeft && e.pageX <= polygonDefenderDom.offsetLeft + polygonDefenderDom.offsetWidth
    ) {
      setModalHeading(polygonDefenderHeading);
      setModalText(polygonDefenderText);
      setModalVisibility(true);
      setPosition({
        x: e.pageX < window.innerWidth / 2 ? (e.pageX + 20) : (e.pageX - 553),
        y: e.pageY,
      });

      return;
    }

    setModalVisibility(false);
  };

  const showInfoModal = (modalHeading: string, modalText: string): void => {
    setModalHeading(modalHeading);
    setModalText(modalText);
    setModalVisibility(true);
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
            position={position}
          >
            {window.innerWidth < 425 &&
              <Button
                text={'Got it!'}
                priority={'primary'}
                onClick={() => setModalVisibility(false)}
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
                // styles={ButtonStyles.red}
                priority='secondary'
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
