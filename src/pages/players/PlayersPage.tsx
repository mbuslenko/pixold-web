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
          <div className="top-back-wrap">
            <Link to="/play">
              <Button
                text="← Back to play"
                // className="top-back"
                appearance={{ priority: 'secondary', theme: 'black-white' }}
              />
            </Link>
          </div>
          <main className="top-info">
            <div className="top-heading-container">
              <h1 className="top-title">Top Players page</h1>
              <h2 className="top-desc">Will be soon</h2>
            </div>
            <div className="top-table">
              <img src={playerList} alt="Player list" className="player-list" />
            </div>
          </main>
          <div className="top-show-wrap">
            <Button
              text="Sign up for preview"
              appearance={{ priority: 'primary', theme: 'black-white' }}
              // className="top-show"
              onClick={showModalPreview}
            />
          </div>
        </div>
      </section>
      {isVisibleModalPreview && (
        <div className="top-modal-wrapper">
          <Modal
            heading={modalHeading}
            text={modalText}
            // sizeClassName="top-modal-size"
          >
            <Button
              text="Close"
              appearance={{ priority: 'primary' }}
              // className="top-btn-close"
              onClick={hideModalPreview}
            />
          </Modal>
        </div>
      )}
    </>
  );
};
