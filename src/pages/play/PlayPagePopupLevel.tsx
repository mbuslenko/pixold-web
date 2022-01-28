import { Link } from 'react-router-dom';

import { HexagonLevel } from '../../shared/ts/interfaces';

import { Button } from '../../components/button/Button';

import './PlayPagePopupLevel.scss';
import { hexagonLevelInfo, levelNameAll, getNextItem } from './hexagonInfoData';
import { IPlayPagePopupLevelProps } from './interfaces';

export const PlayPagePopupLevel: React.FC<IPlayPagePopupLevelProps> = ({ hexagonInfo, setModalIsVisibleCallback }) => {
  const info = hexagonLevelInfo['attack'];

  return (
    <section className="play-page-popup-tab">
      <h2 className="play-page-popup-heading">{levelNameAll[hexagonInfo.level]}</h2>
      <div className="play-page-popup-level-content">
        <div>
          <h3 className="play-page-popup-content-heading">Next level</h3>
          <p className="play-page-popup-content-text">
            {getNextItem(Object.entries(levelNameAll), HexagonLevel[hexagonInfo.level])[1]}
          </p>
        </div>
        <Button
          text={'Upgrade'}
          appearance={{ priority: 'secondary' }}
          onClick={() => setModalIsVisibleCallback(true)}
        />
        <div>
          <h3 className="play-page-popup-content-heading">{info.description}</h3>
          <p className="play-page-popup-content-text">{info.levelAll[HexagonLevel[hexagonInfo.level]]}</p>
        </div>
        <div>
          <h3 className="play-page-popup-content-heading">On next level</h3>
          <p className="play-page-popup-content-text">
            {getNextItem(info.levelAll, HexagonLevel[hexagonInfo.level])}
          </p>
        </div>
        <div className="play-page-popup-level-list">
          <h3 className="play-page-popup-content-heading">More about levels</h3>
          <p className="play-page-popup-content-text">
            {Object.entries(levelNameAll).map(([key, value], index) => (
              <span key={index}>
                {index !== 0 && ' → '}
                <span className={key === hexagonInfo.level ? 'play-page-popup-current-level' : ''}>{value}</span>
              </span>
            ))}
          </p>
        </div>
        <Link to="/faq">
          <Button text={'Read more'} appearance={{ priority: 'secondary' }} />
        </Link>
      </div>
    </section>
  );
};
