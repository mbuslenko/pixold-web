import { Link } from 'react-router-dom';

import { HexagonLevel } from '../../../shared/ts/interfaces';

import { Button } from '../../../components/button/Button';

import './PlayPopupLevel.scss';
import { hexagonLevelInfo, levelNameAll, getNextItem } from './hexagonInfoData';
import { IPlayPopupLevelProps } from './interfaces';
import { LinkToFaq } from '../../../components/linkToFaq/LinkToFaq'

export const PlayPopupLevel: React.FC<IPlayPopupLevelProps> = ({ hexagonInfo, setModalIsVisibleCallback }) => {
  // HACK: test
  const info = hexagonLevelInfo[hexagonInfo.type !== 'without' ? hexagonInfo.type : 'attack'];

  return (
    <section className="play-popup-tab">
      <h2 className="play-popup-heading">{levelNameAll[hexagonInfo.level]}</h2>
      <div className="play-popup-level-content">
        <div>
          <h3 className="play-popup-content-heading">Next level</h3>
          <p className="play-popup-content-text">
            {getNextItem(Object.entries(levelNameAll), HexagonLevel[hexagonInfo.level])[1]}
          </p>
        </div>
        <Button
          text={'Upgrade'}
          appearance={{ priority: 'secondary' }}
          onClick={() => setModalIsVisibleCallback(true)}
          disabled={hexagonInfo.level === 'supreme'}
        />
        <div>
          <h3 className="play-popup-content-heading">{info.description}</h3>
          <p className="play-popup-content-text">{info.levelAll[HexagonLevel[hexagonInfo.level]]}</p>
        </div>
        <div>
          <h3 className="play-popup-content-heading">On next level</h3>
          <p className="play-popup-content-text">{getNextItem(info.levelAll, HexagonLevel[hexagonInfo.level])}</p>
        </div>
        <div className="play-popup-level-list">
          <h3 className="play-popup-content-heading">More about levels</h3>
          <p className="play-popup-content-text">
            {Object.entries(levelNameAll).map(([key, value], index) => (
              <span key={index}>
                {index !== 0 && ' → '}
                <span className={key === hexagonInfo.level ? 'play-popup-current-level' : ''}>{value}</span>
              </span>
            ))}
          </p>
        </div>
        <LinkToFaq questionId=''>
          <Button text={'Read more'} appearance={{ priority: 'secondary' }} />
        </LinkToFaq>
      </div>
    </section>
  );
};
