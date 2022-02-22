import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { InputStatus } from '../../components/types';
import { LumenLogoSvg } from '../../components/lumenLogoSvg/LumenLogoSvg';

import './WalletConnectPage.scss';
import { prepareRequest } from '../../shared/ts/clientCommunication';
import { addAlert } from '../../store/alertSlice';
import { PostResponseWalletConnect } from '../../shared/ts/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { LinkToFaq } from '../../components/linkToFaq/LinkToFaq';
import { setUserWallet } from '../../store/userSlice';

export const WalletConnectPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.user.userId);

  const navigate = useNavigate();

  const [publicKey, setPublicKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [publicKeyStatus, setPublicKeyStatus] = useState<InputStatus>();
  const [secretKeyStatus, setSecretKeyStatus] = useState<InputStatus>();

  const postData = {
    userId: userId ?? '',
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

  const postResponseCallback = (response: PostResponseWalletConnect) => {
    dispatch(setUserWallet(response.data));
    navigate('/wallet');
  };

  const postErrorCallback = (error: any) => {
    dispatch(addAlert({ type: 'error', heading: error.response.data.message }));
    setPublicKeyStatus('invalid');
    setSecretKeyStatus('invalid');
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
    }

    if (secretKey.length === 0) {
      setSecretKeyStatus('invalid');

      return;
    }

    prepareRequest(
      navigate,
      dispatch,
    )({
      requestConfig: {
        method: 'post',
        url: `/wallet/connect`,
        data: postData,
      },
      onResponse: postResponseCallback,
      onError: postErrorCallback,
    });
  };

  return (
    <section className="wallet-connect-page">
      <Button
        className="go-back-link"
        text="←"
        appearance={{ priority: 'secondary', theme: 'black-white' }}
        onClick={() => navigate(-1)}
      />

      <div className="wallet-connect-text-container">
        <LumenLogoSvg color="pink" className="wallet-connect-lumen-logo" />
        <h1 className="wallet-connect-heading">Connect a wallet</h1>
        <p className="wallet-connect-text">
          To connect your wallet, you will need a Public key and a Secret key. Enter them in the fields below to connect
          your wallet. Once connected, you will be able to perform any in-game transactions. For more info, visit our{' '}
          <LinkToFaq questionId="f4fa1f54-a705-4039-989e-ff1177f60cc7">FAQ</LinkToFaq> page.
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
    </section>
  );
};
