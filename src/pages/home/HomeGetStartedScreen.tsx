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
        <img className="whale-img whale-top" src={imgWhale1} />
        <Modal
          heading="Let’s dive in!"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat."
          className="get-started-modal-size"
        >
          <Link to="/auth">
            <Button text={'Get started'} appearance={{ priority: 'primary' }} className="get-started-screen-button" />
          </Link>
        </Modal>
        <img src={imgWhale2} className="whale-img whale-bottom" />
      </div>
    </section>
  );
};
