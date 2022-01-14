import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';

import './HomeGetStartedScreen.scss';
import imgWhale1 from '../../assets/svg/whale-1.svg';
import imgWhale2 from '../../assets/svg/whale-2.svg';

export const HomeGetStartedScreen: React.FC = () => {
  return (
    <section className="get-started-screen">
      <div className="info-container">
        <img className="whale-img whale-top" alt="" src={imgWhale1} />
        <Modal
          heading="Get ready to dive in!"
          text="We're working hard to make Pixold see the world faster. On February 4 this year, you will be able to dive into the world of new adventures and fight for the championship around the world. Get ready, because everyone else is not wasting time!"
          className="get-started-modal-size"
        >
          <Link to="/auth">
            <Button text={'Get started'} appearance={{ priority: 'primary' }} className="get-started-screen-button" />
          </Link>
        </Modal>
        <img src={imgWhale2} alt="" className="whale-img whale-bottom" />
      </div>
    </section>
  );
};
