import { Link } from 'react-router-dom';

import { Button } from '../../../components/ui-kit/button/Button';
import '../../../components/ui-kit/button/ButtonThemes.scss';


import './WalletHeader.scss';
import logoImg from '../../../assets/svg/logo.svg';
import { WalletHeaderProps } from '../interfaces';

const usernameMaxLength = 10;
const usernameOverflow = '...';

export const WalletHeader: React.FC<WalletHeaderProps> = ({ username }) => {
  const adjustUsernameLength = (username: string): string => {
    // TODO: need refactoring
    if (username.length <= usernameMaxLength) {
      return username;
    }

    for (let i = usernameMaxLength - 1; i >= 0; i--) {
      if (username[i] === '_' && i + usernameOverflow.length <= usernameMaxLength + 1) {
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
