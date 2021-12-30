import { useState } from 'react';
import { Link } from 'react-router-dom';

import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';

import { Button } from '../../components/ui-kit/button/Button';
import { Modal } from '../../components/ui-kit/modal/Modal';

import './TopPage.scss';
import { TopPlayer } from './TopPlayer';

//TODO: scroll container if 50 players and realization background-gradient

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

const modalHeading = 'All seats are already taken';

const modalText =
  "We are very sorry, but we have already signed up enough people to test. We try to release it as soon as possible, so you won't have to wait long!";

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

  return (
    <>
      <div className={`top-content ${isVisibleModalPreview && 'is-blurred'}`}>
        <div className="top-back-wrap">
          <Link to="/game">
            <Button text="← Back to game" priority="secondary" className="top-back" />
          </Link>
        </div>
        <div className="top-info">
          <div className="top-heading-container">
            <h1 className="top-title">Top Players page</h1>
            <h2 className="top-desc">Will be soon</h2>
          </div>
          <div className="top-table">
            {arrTopPlayers.map((value) => {
              return <TopPlayer username={value.username} place={value.place} score={value.score} />;
            })}
          </div>
        </div>
        <div className="top-show-wrap">
          <Button text="Sign up for preview" priority="primary" className="top-show" onClick={showModalPreview} />
        </div>
      </div>
      {isVisibleModalPreview && (
        <div className="top-modal-wrapper">
          <Modal heading={modalHeading} text={modalText} sizeClassName="top-modal-size">
            <Button text="Close" priority="primary" className="top-btn-close" onClick={hideModalPreview} />
          </Modal>
        </div>
      )}
    </>
  );
};
