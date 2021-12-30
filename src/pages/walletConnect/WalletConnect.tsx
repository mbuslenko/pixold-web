import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAxiosInstance } from '../../shared/ts/axiosInstance';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { Alert } from '../../components/alert/Alert';
import { InputStatus } from '../../components/type';

import './WalletConnect.scss';
import lumenLogoImg from '../../assets/svg/lumen-logo.svg';

export const WalletConnect: React.FC = () => {
  const navigate = useNavigate();
  const request = useAxiosInstance(navigate);
  const [publicKey, setPublicKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [publicKeyStatus, setPublicKeyStatus] = useState<InputStatus>();
  const [secretKeyStatus, setSecretKeyStatus] = useState<InputStatus>();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertHeading, setAlertHeading] = useState<string>('');
  const postData = {
    userId: window.localStorage.getItem('userId') ?? '',
    publicKey,
    secret: secretKey,
  };

  const publicKeyInputCallback = (text: string, status: InputStatus | undefined) => {
    setPublicKey(text);
    setPublicKeyStatus(status);
  };
  const secretKeyInputCallback = (text: string, status: InputStatus | undefined) => {
    setSecretKey(text);
    setSecretKeyStatus(status);
  };

  const connectWalletCallback = () => {
    if (publicKeyStatus === 'invalid' || secretKeyStatus === 'invalid') {
      return;
    }

    if (publicKey.length === 0) {
      setPublicKeyStatus('invalid');

      if (secretKey.length === 0) {
        setSecretKeyStatus('invalid');
      }

      return;
    } else if (secretKey.length === 0) {
      setSecretKeyStatus('invalid');

      return;
    }

    request({
      requestConfig: {
        method: 'post',
        url: `/wallet/connect`,
        data: postData,
      },
      onResponse: () => navigate('/wallet'),
      onError: postErrorCallback,
    });
  };

  const postErrorCallback = (error: any) => {
    if (error.response.status === 400) {
      setAlertHeading(error.response.data.message);
    }

    setIsAlertVisible(true);
    setPublicKeyStatus('invalid');
    setSecretKeyStatus('invalid');
    setTimeout(
      () => setIsAlertVisible(false),
      5000,
    );
  };

  return (
    <section className='wallet-connect-page'>
      <Link
        className='go-back-link'
        to='/coin'
      >
        <Button
          text='←'
          appearance={{ priority: 'secondary', theme: 'black-white' }}
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Blandit ultricies aliquam quis in accumsan, vel ut.
          Posuere suscipit neque scelerisque libero.
          Quisque ipsum tristique arcu velit facilisi nec lectus.
          Commodo sed elementum congue consequat.
        </p>
      </div>

      <div className='wallet-connect-input-container'>
        <Input
          type='text'
          placeholder='Enter your public key'
          description='Public key'
          onInputCallback={publicKeyInputCallback}
          status={publicKeyStatus}
        />
        <Input
          type='text'
          placeholder='Enter your secret key'
          description='Secret key'
          onInputCallback={secretKeyInputCallback}
          status={secretKeyStatus}
        />
      </div>
      <Button
        text='Submit'
        appearance={{ priority: 'primary', theme: 'pink' }}
        onClick={connectWalletCallback}
        addedClasses='no-shrink'
      />
      { isAlertVisible &&
        <Alert
          type='red'
          heading={alertHeading}
          onClick={() => setIsAlertVisible(false)}
        />
      }
    </section>
  );
};
