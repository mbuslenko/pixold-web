import { Link } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import { HexagonLevel } from '../../shared/ts/interfaces';
import { IPlayPagePopupLevelProps } from './interfaces';

import './PlayPagePopupLevel.scss';

const hexagonLevelInfo = {
  miner: {
    description: 'Chance to mine',
    levelAll: ['15%', '40%', '50%', '65%'],
  },
  attack: { description: 'Chance of a successful attack', levelAll: ['15%-30%', '15%-45%', '15%-60%', '15%-80%'] },
  defender: { description: 'Change of repel an attack', levelAll: ['50%', '70%', '90%', '98%'] },
};
const levelNameAll: Record<keyof typeof HexagonLevel, string> = {
  starter: 'Starter',
  middle: 'Middle',
  pro: 'Pro',
  supreme: 'Supreme',
};

const getNextItem = (array: any[], index: number) => array[Math.min(array.length - 1, index + 1)];

export const PlayPagePopupLevel: React.FC<IPlayPagePopupLevelProps> = ({ hexagonInfo, setModalIsVisibleCallback }) => {
  const info = hexagonLevelInfo['attack'];

  return (
    <section className="play-page-popup-tab">
      <h2 className="play-page-popup-heading">{levelNameAll[hexagonInfo?.level ?? 'starter']}</h2>
      <div className="play-page-popup-level-content">
        <div>
          <h3 className="play-page-popup-content-heading">Next level</h3>
          <p className="play-page-popup-content-text">
            {getNextItem(Object.entries(levelNameAll), HexagonLevel[hexagonInfo?.level ?? 'starter'])[1]}
          </p>
        </div>
        <Button
          text={'Upgrade'}
          appearance={{ priority: 'secondary' }}
          onClick={() => setModalIsVisibleCallback(true)}
        />
        <div>
          <h3 className="play-page-popup-content-heading">{info.description}</h3>
          <p className="play-page-popup-content-text">{info.levelAll[HexagonLevel[hexagonInfo?.level ?? 'starter']]}</p>
        </div>
        <div>
          <h3 className="play-page-popup-content-heading">On next level</h3>
          <p className="play-page-popup-content-text">
            {getNextItem(info.levelAll, HexagonLevel[hexagonInfo?.level ?? 'starter'])}
          </p>
        </div>
        <div className="play-page-popup-level-list">
          <h3 className="play-page-popup-content-heading">More about levels</h3>
          <p className="play-page-popup-content-text">
            {Object.entries(levelNameAll).map(([key, value], index) => (
              <span key={index}>
                {index !== 0 && ' → '}
                <span className={key === hexagonInfo?.level ? 'play-page-popup-current-level' : ''}>{value}</span>
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
