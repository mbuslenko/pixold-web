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
          heading="Get ready to dive in!"
          text="We're working hard to make Pixold see the world faster. On February 4 this year, you will be able to dive into the world of new adventures and fight for the championship around the world. Get ready, because everyone else is not wasting time!"
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
