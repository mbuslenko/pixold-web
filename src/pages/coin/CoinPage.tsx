import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';

import './CoinPage.scss';
import pageBackgroundImg1 from '../../assets/svg/coin-page-background-1.svg';
import pageBackgroundImg2 from '../../assets/svg/coin-page-background-2.svg';
import pixelCoinLogoImg from '../../assets/svg/pixel-coin-logo.svg';
import pixelCoinCircleImg from '../../assets/svg/pixel-coin-circle.svg';
import lumenLogoImg from '../../assets/svg/lumen-logo.svg';

export const CoinPage: React.FC = () => {
  return (
    <section className='coin-page'>
      <div className='coin-page-background'>
        <img src={pageBackgroundImg1}/>
        <img src={pageBackgroundImg2}/>
      </div>
      <div className='coin-page-content'>
        <div>
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
              appearance={{ priority: 'primary', theme: 'black-white' }}
            />
          </Link>

          <Link
            className='link'
            to='/play'
          >
            <Button
              text='Back to the game'
              appearance={{ priority: 'secondary', theme: 'black-white' }}
            />
          </Link>
        </nav>
      </div>
    </section>
  );
};
