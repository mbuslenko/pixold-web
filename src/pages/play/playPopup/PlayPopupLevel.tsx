import { Button } from '../../../components/button/Button';
import { LinkToFaq } from '../../../components/linkToFaq/LinkToFaq';

import './PlayPopupLevel.scss';
import { hexagonActionChance, levelNameAll, getNextLevelActionChance, getActionChance } from './hexagonInfoData';
import { IPlayPopupLevelProps } from './interfaces';

export const PlayPopupLevel: React.FC<IPlayPopupLevelProps> = ({ hexagonInfo, setModalIsVisibleCallback }) => {
  const info = hexagonActionChance[hexagonInfo.type !== 'without' ? hexagonInfo.type : 'attack'];

  return (
    <section className="play-popup-tab">
      <h2 className="play-popup-heading">{levelNameAll[hexagonInfo.level].value}</h2>
      <div className="play-popup-level-content">
        <div>
          <h3 className="play-popup-content-heading">Next level</h3>
          <p className="play-popup-content-text">{levelNameAll[hexagonInfo.level].nextValue}</p>
        </div>
        <Button
          text={'Upgrade'}
          appearance={{ priority: 'secondary' }}
          onClick={() => setModalIsVisibleCallback(true)}
          disabled={hexagonInfo.level === 'supreme'}
        />
        <div>
          <h3 className="play-popup-content-heading">{info.description}</h3>
          <p className="play-popup-content-text">{getActionChance(info.chance, hexagonInfo.level)}</p>
        </div>
        <div>
          <h3 className="play-popup-content-heading">On next level</h3>
          <p className="play-popup-content-text">{getNextLevelActionChance(info.chance, hexagonInfo.level)}</p>
        </div>
        <div className="play-popup-level-list">
          <h3 className="play-popup-content-heading">More about levels</h3>
          <p className="play-popup-content-text">
            {Object.entries(levelNameAll).map(([key, value], index) => (
              <span key={`hexagon-level-${index}`}>
                {index !== 0 && ' → '}
                <span className={key === hexagonInfo.level ? 'play-popup-current-level' : ''}>{value.value}</span>
              </span>
            ))}
          </p>
        </div>
        <LinkToFaq questionId="">
          <Button text={'Read more'} appearance={{ priority: 'secondary' }} />
        </LinkToFaq>
      </div>
    </section>
  );
};
