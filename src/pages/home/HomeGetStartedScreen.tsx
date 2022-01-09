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
        <img className="whale-img whale-top" alt="" src={imgWhale1} />
        <Modal
          heading="Let’s dive in!"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat."
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
