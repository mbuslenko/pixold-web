import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { InputStatus } from '../../components/types';

import './RedeemCode.scss';
import { client } from '../../shared/ts/ClientCommunication';

const openseaLink =
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/53812526196032344565437183040714628674999174739090954850032801003187019448321';

export const RedeemCode: React.FC = () => {
  const navigate = useNavigate();
  const [redeemCodeKey, setRedeemCodeKey] = useState<string>('');
  const [redeemCodeStatus, setRedeemCodeStatus] = useState<InputStatus>();
  const postData = {
    code: redeemCodeKey,
  };

  // TODO: redirect if !accessToken ?

  const redeemCodeInputCallback = (text: string, status: InputStatus | undefined) => {
    setRedeemCodeKey(text);
    setRedeemCodeStatus(status);
  };

  const redeemCodeSubmitCallback = () => {
    if (redeemCodeStatus === 'invalid') {
      return;
    }

    if (redeemCodeKey.length === 0) {
      setRedeemCodeStatus('invalid');

      return;
    }

    client.prepareRequest(navigate)({
      requestConfig: {
        method: 'post',
        url: `/hexagon/redeem`,
        data: postData,
      },
      onResponse: () => {
        setRedeemCodeStatus('valid');
        navigate('/play');
      },
      onError: postErrorCallback,
    });
  };

  const redeemCodeCancelCallback = () => {
    navigate('/play');
  };

  const postErrorCallback = (error: any, triggerAlertCallback: (message: string) => void) => {
    triggerAlertCallback(error.response.data.message);
    setRedeemCodeStatus('invalid');
  };

  return (
    <section className="redeem-page">
      <main className="redeem-content">
        <h1 className="redeem-title">Redeem code</h1>
        <p className="redeem-text">
          To add a hexagon to your account, you need a code that you can get after purchasing from our OpenSea page.
          Enter the code in the line below
        </p>

        <div className="redeem-input-wrap">
          <Input
            type="text"
            placeholder="Please enter your code"
            description="Your code"
            onInput={redeemCodeInputCallback}
            status={redeemCodeStatus}
          />
          <div className="redeem-buttons-wrap">
            <Button text="Submit" appearance={{ priority: 'primary' }} onClick={redeemCodeSubmitCallback} />
            <Button
              text="Cancel"
              appearance={{ priority: 'secondary', theme: 'grey' }}
              onClick={redeemCodeCancelCallback}
            />
          </div>
        </div>
        <a href={openseaLink} className="redeem-opensea-link" target="_blank" rel="noreferrer noopener">
          <Button
            text="Browse on OpenSea"
            appearance={{ priority: 'primary', theme: 'opensea-black' }}
            className="redeem-button-opensea"
          />
          <Button
            text="Browse on OpenSea"
            appearance={{ priority: 'primary', theme: 'opensea-white' }}
            className="redeem-button-opensea-small"
          />
        </a>
      </main>
    </section>
  );
};
