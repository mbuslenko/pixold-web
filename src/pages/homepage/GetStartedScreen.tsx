import { Button } from '../../components/ui-kit/button/Button';
import { Modal } from '../../components/ui-kit/modal/Modal';
import { Link } from 'react-router-dom';
import imgWhale1 from '../../assets/svg/whale-1.svg';
import imgWhale2 from '../../assets/svg/whale-2.svg';
import './GetStartedScreen.scss';

export const GetStartedScreen: React.FC = () => {
  return (
    <section className='get-started-screen'>
      <div className='info-container'>
        <img
          className='whale-img whale-top'
          src={imgWhale1}
        />
        <Modal
          heading='Let’s dive in!'
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat.'
          sizeClassName='get-started-modal-size'
          colorsClassName='get-started-modal-color'
        >
          {/* #TODO: look for alternative for redirect */}
          <Link to='/auth'>
            <Button
              text={'Get started'}
              priority='primary'
            />
          </Link>
        </Modal>
        <img
          src={imgWhale2}
          className='whale-img whale-bottom'
        />
      </div>
    </section>
  );
};
