import { useState } from 'react';
import { Link } from 'react-router-dom';

import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';

import { Button } from '../../components/ui-kit/button/Button';
import { Modal } from '../../components/ui-kit/modal/Modal';

import './TopPage.scss';
import { TopPlayer } from './TopPlayer';

const arrTopPlayers = [
  { username: '', place: '', score: '' },
  { username: '', place: '', score: '' },
  { username: '', place: '', score: '' },
  { username: '', place: '', score: '' },
  { username: '', place: '', score: '' },
  { username: '', place: '', score: '' },
  { username: '', place: '', score: '' },
  { username: '', place: '', score: '' },
];

export const TopPage: React.FC = () => {
  const [isVisibleModalPreview, setIsVisibleModalPreview] = useState<boolean>(false);

  const showModalPreview = (): void => {
    blockScrolling();
    setIsVisibleModalPreview(true);
  };

  const hideModalPreview = (): void => {
    setIsVisibleModalPreview(false);
    unblockScrolling();
  };

  const modalHeading = 'All seats are already taken';

  const modalText =
    "We are very sorry, but we have already signed up enough people to test. We try to release it as soon as possible, so you won't have to wait long!";

  return (
    <>
      <div className={`top-wrap ${isVisibleModalPreview && 'is-blurred'}`}>
        <div className="top-content">
          <div className="top-back-wrap">
            <Link to="/game">
              <Button text="← Back to game" priority="secondary" className="top-back" />
            </Link>
          </div>
          <div className="top-info">
            <h1 className="top-title">Top Players page</h1>
            <div className="top-desc">Will be soon</div>
            <div className="top-table">
              {arrTopPlayers.map((_, index) => {
                return (
                  <TopPlayer
                    username={arrTopPlayers[index].username}
                    place={arrTopPlayers[index].place}
                    score={arrTopPlayers[index].score}
                  />
                );
              })}
            </div>
          </div>
          <div className="top-show-wrap">
            <Button text="Sign up for preview" priority="primary" className="top-show" onClick={showModalPreview} />
          </div>
        </div>
      </div>
      {isVisibleModalPreview && (
        <div className="top-modal-wrapper">
          <Modal
            heading={modalHeading}
            text={modalText}
            sizeClassName="top-modal-size"
            buttonContainerClassName="top-btn-close-container"
          >
            <Button text="Close" priority="primary" className="top-btn-close" onClick={hideModalPreview} />
          </Modal>
        </div>
      )}
    </>
  );
};
