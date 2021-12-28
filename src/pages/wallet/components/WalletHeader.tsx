import { Link } from 'react-router-dom';

import { Button } from '../../../components/ui-kit/button/Button';
import '../../../components/ui-kit/button/ButtonThemes.scss';

import { WalletHeaderProps } from '../interfaces';

import './WalletHeader.scss';
import logoImg from '../../../assets/svg/logo.svg';

const usernameMaxLength = 10;
const usernameOverflow = '...';

export const WalletHeader: React.FC<WalletHeaderProps> = ({ username }) => {
  const adjustUsernameLength = (username: string): string => {
    if (username.length <= usernameMaxLength) {
      return username;
    }

    for (let i = usernameMaxLength - 1; i >= 0; i--) {
      const newUsernameLength: number = i + 1 + usernameOverflow.length;

      if (username[i] === '_' && newUsernameLength <= usernameMaxLength) {
        return username.slice(0, i) + usernameOverflow;
      }
    }

    return username.slice(0, usernameMaxLength - usernameOverflow.length) + usernameOverflow;
  };

  return (
    <header className='wallet-page-header'>
      <Link to={'/play'}>
        <Button
          text='← Back to game'
          priority='secondary'
          className='faq-secondary-button-black-white-color header-button-big'
        />
        <Button
          text='←'
          priority='secondary'
          className='faq-secondary-button-black-white-color header-button-small'
        />
      </Link>
      <div className='user-container'>
        <span className='username'>
          {adjustUsernameLength(username)}
        </span>
        <Link to={'/home'}>
          <img className='header-logo' src={logoImg}/>
        </Link>
      </div>
    </header>
  );
};
