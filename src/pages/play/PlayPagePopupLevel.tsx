import { Button } from '../../components/button/Button';

import './PlayPagePopupLevel.scss';

export const PlayPagePopupLevel: React.FC = () => {
  return (
    <section className="play-page-popup-tab">
      <h2 className="play-page-popup-heading">{'Pro'}</h2>
      <div className="play-page-popup-level-content">
        <div>
          <h3 className="play-page-popup-content-heading">Next level</h3>
          <p className="play-page-popup-content-text">Supreme</p>
        </div>
        <Button text={'Upgrade'} appearance={{ priority: 'secondary' }} />
        <div>
          <h3 className="play-page-popup-content-heading">Change to mine</h3>
          <p className="play-page-popup-content-text">{'50%'}</p>
        </div>
        <div>
          <h3 className="play-page-popup-content-heading">On next level</h3>
          <p className="play-page-popup-content-text">{'65%'}</p>
        </div>
        <div className="play-page-popup-level-list">
          <h3 className="play-page-popup-content-heading">More about levels</h3>
          <p className="play-page-popup-content-text">{'Starter → Middle → Pro → Supreme'}</p>
        </div>
        <Button text={'Read more'} appearance={{ priority: 'secondary' }} />
      </div>
    </section>
  );
};
