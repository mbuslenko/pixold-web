import { Button } from '../../components/button/Button';
import { PlayPagePopupInfoProps } from './interfaces'

import './PlayPagePopupInfo.scss';

export const PlayPagePopupInfo: React.FC<PlayPagePopupInfoProps> = ({ hexagonId }) => {
  return (
    <section className="play-page-popup-tab">
      <h2 className="play-page-popup-heading">
        Hexagon <span className="play-page-popup-info-hexagon-id">{`#${hexagonId}`}</span>
      </h2>
      <div className="play-page-popup-info-content">
        <div>
          <h3 className="play-page-popup-content-heading">Type</h3>
          <p className="play-page-popup-content-text">Miner</p>
        </div>
        <Button text={'Change'} appearance={{ priority: 'secondary' }} />
        <div>
          <h3 className="play-page-popup-content-heading">Level</h3>
          <p className="play-page-popup-content-text">Pro</p>
        </div>
        <Button text={'Upgrade'} appearance={{ priority: 'secondary' }} />
        <div>
          <h3 className="play-page-popup-content-heading">Coins in storage</h3>
          <p className="play-page-popup-content-text">4.0001</p>
        </div>
        <Button text={'Send to my wallet'} appearance={{ priority: 'secondary' }} />
        <div>
          <h3 className="play-page-popup-content-heading">Owner</h3>
          <p className="play-page-popup-content-text">slavik_228</p>
        </div>
        <Button className="play-page-popup-info-attack-button" text={'Attack'} appearance={{ priority: 'primary' }} />
      </div>
    </section>
  );
};
