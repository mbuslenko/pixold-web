import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';

import './HomeGetStartedScreen.scss';
import imgWhale1 from '../../assets/svg/whale-1.svg';
import imgWhale2 from '../../assets/svg/whale-2.svg';
import { redirect } from '../../shared/ts/helperFunctions';

export const HomeGetStartedScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="get-started-screen">
      <div className="info-container">
        <img src={imgWhale1} alt="" className="whale-img whale-top" />
        <Modal
          heading="Let's dive in!"
          text="It's time to dive into a world of new adventures. An entire map is at your disposal - buy hexes, attack, and get PXL. Fight for map supremacy!"
          className="get-started-modal-size"
        >
          <Button
            text={'Get started'}
            appearance={{ priority: 'primary' }}
            className="get-started-screen-button"
            onClick={() => redirect(navigate, '/play')}
          />
        </Modal>
        <img src={imgWhale2} alt="" className="whale-img whale-bottom" />
      </div>
    </section>
  );
};
