import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAxiosInstance } from '../../shared/ts/axiosInstance';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { Alert } from '../../components/alert/Alert';
import { InputStatus } from '../../components/types';
import { LumenLogoSvg } from '../../components/lumenLogoSvg/LumenLogoSvg';

import './WalletConnectPage.scss';

export const WalletConnectPage: React.FC = () => {
  const navigate = useNavigate();
  const request = getAxiosInstance(navigate);
  const [publicKey, setPublicKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [publicKeyStatus, setPublicKeyStatus] = useState<InputStatus>();
  const [secretKeyStatus, setSecretKeyStatus] = useState<InputStatus>();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertHeading, setAlertHeading] = useState<string>('');
  const postData = {
    userId: localStorage.getItem('userId') ?? '',
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
    setTimeout(() => setIsAlertVisible(false), 5000);
  };

  return (
    <section className="wallet-connect-page">
      <Link className="go-back-link" to="/coin">
        <Button text="←" appearance={{ priority: 'secondary', theme: 'black-white' }} />
      </Link>

      <div className="wallet-connect-text-container">
        <LumenLogoSvg color="pink" className="wallet-connect-lumen-logo" />
        <h1 className="wallet-connect-heading">Connect a wallet</h1>
        <p className="wallet-connect-text">
        To connect your wallet, you will need a Public key and a Secret key. 
        Enter them in the fields below to connect your wallet. 
        Once connected, you will be able to perform any in-game transactions.
        For more info, visit our <Link to="/faq/f4fa1f54-a705-4039-989e-ff1177f60cc7">FAQ</Link> page.
        </p>
      </div>

      <div className="wallet-connect-input-container">
        <Input
          type="text"
          placeholder="Enter your public key"
          description="Public key"
          onInput={publicKeyInputCallback}
          status={publicKeyStatus}
        />
        <Input
          type="text"
          placeholder="Enter your secret key"
          description="Secret key"
          onInput={secretKeyInputCallback}
          status={secretKeyStatus}
        />
      </div>
      <Button
        text="Submit"
        appearance={{ priority: 'primary', theme: 'pink' }}
        onClick={connectWalletCallback}
        className="wallet-submit-button"
      />
      {isAlertVisible && (
        <Alert type="red" heading={alertHeading} closeAlertCallback={() => setIsAlertVisible(false)} />
      )}
    </section>
  );
};
