import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';

import './HomeGetStartedScreen.scss';
import imgWhaleTop from '../../assets/svg/whale-top.svg';
import imgWhaleBottom from '../../assets/svg/whale-bottom.svg';
import { redirect } from '../../shared/ts/helperFunctions';

export const HomeGetStartedScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="get-started-screen">
      <div className="info-container">
        <img src={imgWhaleTop} alt="" className="whale-img whale-top" />
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
        <img src={imgWhaleBottom} alt="" className="whale-img whale-bottom" />
      </div>
    </section>
  );
};
