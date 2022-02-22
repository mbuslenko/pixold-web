import { LogoWithTextSvg } from '../../components/logoWithTextSvg/logoWithTextSvg';

import './HomeFooter.scss';
import discordIcon from '../../assets/svg/discord-icon.svg';
import instagramIcon from '../../assets/svg/instagram-icon.svg';
import telegramIcon from '../../assets/svg/telegram-icon.svg';

export const HomeFooter: React.FC = () => {
  return (
    <footer className="home-footer">
      <p>
        Pixold does not position itself as a way of making money and / or gambling, and it is not. We are not
        responsible for the money spent by users on our site. By connecting wallets of other services to Pixold, you
        automatically agree that this wallet will in the future be used in full for the purposes of the Pixold game.
      </p>
      <p>
        The Pixel Coin (PXL) is an in-game asset that should not and will not be used outside of this ecosystem. Any
        investment and (or) transfer of funds to this asset is a purchase of in-game currency, for further transactions
        within Pixold.
      </p>
      <p>For all questions, suggestions or complaints, you can contact hello@pixold.io</p>
      <div className="home-footer-social">
        <LogoWithTextSvg color="grey" className="home-footer-logo" />
        <nav>
          <ul className="home-footer-social-list">
            <li>
              <a href="https://discord.gg/v782DCSf9E" target="_blank" rel="noreferrer noopener">
                <img src={discordIcon} alt="Discord" className="home-footer-social-icon" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/pixold.io" target="_blank" rel="noreferrer noopener">
                <img src={instagramIcon} alt="Instagram" className="home-footer-social-icon" />
              </a>
            </li>
            <li>
              <a href="https://t.me/pixold_help_bot" target="_blank" rel="noreferrer noopener">
                <img src={telegramIcon} alt="Telegram" className="home-footer-social-icon" />
              </a>
            </li>
          </ul>
        </nav>
        <p className="home-footer-year">2022</p>
      </div>
    </footer>
  );
};
