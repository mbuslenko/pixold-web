import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { PixelCoinLogoSvg } from '../../components/pixelCoinLogoSvg/PixelCoinLogoSvg';
import { LumenLogoSvg } from '../../components/lumenLogoSvg/LumenLogoSvg';

import './CoinPage.scss';
import pageBackgroundImg1 from '../../assets/svg/coin-page-background-1.svg';
import pageBackgroundImg2 from '../../assets/svg/coin-page-background-2.svg';
import pixelCoinCircleImg from '../../assets/svg/pixel-coin-circle.svg';

export const CoinPage: React.FC = () => {
  return (
    <section className='coin-page'>
      <div className='coin-page-background'>
        <img src={pageBackgroundImg1}/>
        <img src={pageBackgroundImg2}/>
      </div>
      <main className='coin-page-content'>
        <div>
          <PixelCoinLogoSvg
            color='pink'
            className='coin-page-icon'
          />
          <LumenLogoSvg
            color='pink'
            className='coin-page-icon'
          />
        </div>
        <div className='coin-page-text-container'>
          <h1>
            Pixel coin
          </h1>
          <p>
            Take the play to real life
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
              text='Back to the play'
              appearance={{ priority: 'secondary', theme: 'black-white' }}
            />
          </Link>
        </nav>
      </main>
    </section>
  );
};
