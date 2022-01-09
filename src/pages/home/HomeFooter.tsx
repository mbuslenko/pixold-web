import { LogoWithTextSvg } from '../../components/logoWithTextSvg/logoWithTextSvg';
import './HomeFooter.scss';

export const HomeFooter: React.FC = () => {
  return (
    <footer className="home-footer">
      <p className="home-footer-top-text">
        Pixold does not position itself as a way of making money and / or gambling, and it is not. We are not
        responsible for the money spent by users on our site. By connecting wallets of other services to Pixold, you
        automatically agree that this wallet will in the future be used in full for the purposes of the Pixold game.
      </p>
      <p>
        The Pixel Coin (PXL) is an in-game asset that should not and will not be used outside of this ecosystem. Any
        investment and (or) transfer of funds to this asset is a purchase of in-game currency, for further transactions
        within Pixold.
      </p>
      <p className="home-footer-bottom-text">For all questions, suggestions or complaints, you can contact hello@pixold.io</p>
      <div className="home-footer-wrap">
        <LogoWithTextSvg color="grey" className="home-footer-logo" />
        <p className="home-footer-year">2022</p>
      </div>
    </footer>
  );
};
