import { Link } from 'react-router-dom';

import { Button } from '../../components/ui-kit/button/Button';

import './CoinPage.scss';
import coinPageBackgroundImg1 from '../../assets/svg/coin-page-background-1.svg';
import coinPageBackgroundImg2 from '../../assets/svg/coin-page-background-2.svg';
import pixelCoinLogoImg from '../../assets/svg/pixel-coin-logo.svg';
import pixelCoinCircleImg from '../../assets/svg/pixel-coin-circle.svg';
import lumenLogoImg from '../../assets/svg/lumen-logo.svg';

export const CoinPage: React.FC = () => {
  return (
    <section className='coin-page'>
      <div className='coin-page-background'>
        <img src={coinPageBackgroundImg1}/>
        <img src={coinPageBackgroundImg2}/>
      </div>
      <div className='coin-page-content'>
        <div className='coin-page-icon-container'>
          <img
            className='coin-page-icon'
            src={pixelCoinLogoImg}
          />
          <img
            className='coin-page-icon'
            src={lumenLogoImg}
          />
        </div>
        <div className='coin-page-text-container'>
          <h1>
            Pixel coin
          </h1>
          <p>
            Take the game to real life
          </p>
          <img
            className='pixel-coin-circle'
            src={pixelCoinCircleImg}
          />
        </div>

        <nav className='coin-page-navigation'>
          <Link
            className='coin-page-link'
            to='/wallet/connect'
          >
            <Button
              text='Connect a wallet'
              priority='primary'
              className='black-white-primary-button-color'
            />
          </Link>

          <Link
            className='coin-page-link'
            to='/play'
          >
            <Button
              text='Back to the game'
              priority='secondary'
              className='black-white-secondary-button-color'
            />
          </Link>
        </nav>
      </div>
    </section>
  );
};
