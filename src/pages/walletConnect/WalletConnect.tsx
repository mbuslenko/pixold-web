import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AxiosInstance } from '../../components/AxiosInstance';
import { Button } from '../../components/ui-kit/button/Button';
import { Input } from '../../components/ui-kit/input/Input';
import { Alert } from '../../components/ui-kit/alert/Alert';
import { InputStatus } from '../../components/ui-kit/type';

import './WalletConnect.scss';
import lumenLogoImg from '../../assets/svg/lumen-logo.svg';

export const WalletConnect: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [publicKeyStatus, setPublicKeyStatus] = useState<InputStatus>();
  const [secretKeyStatus, setSecretKeyStatus] = useState<InputStatus>();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertHeading, setAlertHeading] = useState<string>('');
  const [sendRequest, setSendRequest] = useState<boolean>(false);
  const navigate = useNavigate();
  const postData = {
    userId: window.localStorage.getItem('userId'),
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

    setSendRequest(true);
  };

  const postResponseCallback = () => {
    navigate('/wallet');
  };

  const postErrorCallback = (error: any) => {
    if (error.response.status === 400) {
      setAlertHeading(error.response.data.message);
    }

    setSendRequest(false);
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

      { sendRequest &&
        <AxiosInstance
          requestMethod='post'
          requestUrl={`/wallet/connect`}
          requestData={postData}
          responseCallback={postResponseCallback}
          errorCallback={postErrorCallback}
        />
      }
    </section>
  );
};
