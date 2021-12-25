import { useState } from 'react';
import { Button } from '../../components/ui-kit/button/Button';
import { Input } from '../../components/ui-kit/input/Input';
import { Link } from 'react-router-dom';
import { Alert } from '../../components/ui-kit/alert/Alert';

import lumenLogoImg from '../../assets/svg/lumen-logo.svg';
import './WalletConnect.scss';

export const WalletConnect: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  return (
    <section className='wallet-connect-page'>
      <Link
        className='go-back-link'
        to='/coin'
      >
        <Button
          text='←'
          priority='secondary'
          className='black-white-secondary-button-color'
        />
      </Link>
      <img
        className='lumen-logo'
        src={lumenLogoImg}
      />

      <div className='wallet-connect-text-container'>
        <h1 className='wallet-connect-heading'>
          Connect a wallet
        </h1>
        <p className='wallet-connect-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat.
        </p>
      </div>

      <div className='wallet-connect-input-container'>
        <Input
          type='text'
          placeholder='Enter your public key'
          description='Public key'
          onInput={text => setPublicKey(text)}
          status='default'
        />
        <Input
          type='text'
          placeholder='Enter your secret key'
          description='Secret key'
          onInput={text => setSecretKey(text)}
          status='default'
        />
      </div>
      <Button
        text='Submit'
        priority='primary'
        className='pink-primary-button-color'
        onClick={() => console.log('submit\n' + publicKey + '\n' + secretKey)}
      />
      { isAlertVisible &&
        <Alert type='red' heading='CONNECTION ERROR'/>
      }
    </section>
  );
};
