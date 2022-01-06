import { useState } from 'react';
import { Link } from 'react-router-dom';

import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';

import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';

import './PlayersPage.scss';
import playerList from '../../assets/svg/players-list.svg';

const modalHeading = 'All seats are already taken';

const modalText =
  "We are very sorry, but we have already signed up enough people to test. We try to release it as soon as possible, so you won't have to wait long!";

export const PlayersPage: React.FC = () => {
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
      <section className="top-wrap">
        <div className={`top-content ${isVisibleModalPreview && 'is-blurred'}`}>
          <Link to="/play">
            <Button
              text="← Back to play"
              appearance={{ priority: 'secondary', theme: 'black-white' }}
              className="top-btn top-back-btn"
            />
          </Link>
          <main className="top-info">
            <div className="top-heading-container">
              <h1 className="top-title">Top Players page</h1>
              <h2 className="top-desc">Will be soon</h2>
            </div>
            <div className="top-table">
              <img src={playerList} alt="Player list" className="player-list" />
            </div>
          </main>
          <Button
            text="Sign up for preview"
            appearance={{ priority: 'primary', theme: 'black-white' }}
            className="top-btn top-show-btn"
            onClick={showModalPreview}
          />
        </div>
      </section>
      {isVisibleModalPreview && (
        <div className="top-modal-wrapper">
          <Modal heading={modalHeading} text={modalText}>
            <Button text="Close" appearance={{ priority: 'primary' }} onClick={hideModalPreview} />
          </Modal>
        </div>
      )}
    </>
  );
};
