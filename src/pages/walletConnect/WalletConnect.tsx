import { useState } from 'react';
import { Button } from '../../components/ui-kit/button/Button';
import { Input } from '../../components/ui-kit/input/Input';
import { Link, Navigate } from 'react-router-dom';
import { Alert } from '../../components/ui-kit/alert/Alert';

import { baseUrl } from '../../shared/ts/consts';
import lumenLogoImg from '../../assets/svg/lumen-logo.svg';
import './WalletConnect.scss';
import axios from 'axios';
import { InputStatus } from '../../components/ui-kit/type';

const testUserId = 'cbd7b09b-ada5-46ea-beee-f16817faec14';

export const WalletConnect: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [publicKeyStatus, setPublicKeyStatus] = useState<InputStatus>();
  const [secretKeyStatus, setSecretKeyStatus] = useState<InputStatus>();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertHeading, setAlertHeading] = useState<string>('');
  const [redirectToWallet, setRedirectToWallet] = useState<boolean>(false);

  const connectWalletCallback = () => {
    console.log([testUserId, publicKey, secretKey]);

    if (publicKey.length === 0) {
      setPublicKeyStatus('invalid');

      if (secretKey.length === 0) {
        setSecretKeyStatus('invalid');
      }

      return;
    }

    if (secretKey.length === 0) {
      setSecretKeyStatus('invalid');

      return;
    }

    axios
      .post(
        `${baseUrl}/wallet/connect`,
        {
          userId: testUserId,
          publicKey,
          secret: secretKey,
        },
      )
      .then(() => setRedirectToWallet(true))
      .catch(error => {
        console.error(error.response.data.message);

        if (error.response.status === 400) {
          setAlertHeading(error.response.data.message);
        } else if (error.response.status === 500) {
          setAlertHeading('Internal server error occurred');
        }

        setIsAlertVisible(true);
        setPublicKeyStatus('invalid');
        setSecretKeyStatus('invalid');
        setTimeout(
          () => setIsAlertVisible(false),
          5000,
        );
      });
  };

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
          status={publicKeyStatus}
        />
        <Input
          type='text'
          placeholder='Enter your secret key'
          description='Secret key'
          onInput={text => setSecretKey(text)}
          status={secretKeyStatus}
        />
      </div>
      <Button
        text='Submit'
        priority='primary'
        className='pink-primary-button-color'
        onClick={connectWalletCallback}
      />
      { isAlertVisible &&
        <Alert
          type='red'
          heading={alertHeading}
          onClick={() => setIsAlertVisible(false)}
        />
      }
      { redirectToWallet &&
        <Navigate to='/wallet'/>
      }
    </section>
  );
};
