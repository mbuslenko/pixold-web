import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { PixelCoinLogoSvg } from '../../components/pixelCoinLogoSvg/PixelCoinLogoSvg';
import { LumenLogoSvg } from '../../components/lumenLogoSvg/LumenLogoSvg';

import './CoinPage.scss';
import pageBackgroundImgTop from '../../assets/svg/coin-page-background-top.svg';
import pageBackgroundImgBottom from '../../assets/svg/coin-page-background-bottom.svg';
import pixelCoinCircleImg from '../../assets/svg/pixel-coin-circle.svg';

export const CoinPage: React.FC = () => {
  return (
    <section className="coin-page">
      <div className="coin-page-background">
        <img className="coin-page-background-text" src={pageBackgroundImgTop} alt="" />
        <img className="coin-page-background-text" src={pageBackgroundImgBottom} alt="" />
      </div>
      <main className="coin-page-content">
        <div>
          <PixelCoinLogoSvg color="pink" className="coin-page-icon" />
          <LumenLogoSvg color="pink" className="coin-page-icon" />
        </div>
        <div className="coin-page-text-container">
          <h1>Pixel coin</h1>
          <p>Take the play to real life</p>
          <img className="pixel-coin-circle" src={pixelCoinCircleImg} alt="" />
        </div>

        <nav className="coin-page-navigation">
          <Link className="coin-page-link" to="/wallet/connect">
            <Button text="Connect a wallet" appearance={{ priority: 'primary', theme: 'black-white' }} />
          </Link>

          <Link className="link" to="/play">
            <Button text="Back to the play" appearance={{ priority: 'secondary', theme: 'black-white' }} />
          </Link>
        </nav>
      </main>
    </section>
  );
};
