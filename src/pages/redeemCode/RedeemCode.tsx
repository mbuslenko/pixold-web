import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAxiosInstance } from '../../shared/ts/axiosInstance';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { InputStatus } from '../../components/types';
import { Alert } from '../../components/alert/Alert';

import './RedeemCode.scss';

export const RedeemCode: React.FC = () => {
  const navigate = useNavigate();
  const request = useAxiosInstance(navigate);
  const [redeemCodeKey, setRedeemCodeKey] = useState<string>('');
  const [redeemCodeStatus, setRedeemCodeStatus] = useState<InputStatus>();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertHeading, setAlertHeading] = useState<string>('');
  const postData = {
    code: redeemCodeKey,
  };

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

    request({
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

  const postErrorCallback = (error: any) => {
    if (error.response.status === 400) {
      setAlertHeading(error.response.data.message);
    }

    setIsAlertVisible(true);
    setRedeemCodeStatus('invalid');
    setTimeout(() => setIsAlertVisible(false), 5000);
  };

  return (
    <section className="redeem-page">
      <main className="redeem-content">
        <h1 className="redeem-title">Redeem code</h1>
        <p className="redeem-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
          Posuere suscipit neque scelerisque libero.
        </p>

        <div className="redeem-input-wrap">
          <Input
            type="text"
            placeholder="Please enter your code"
            description="Your code"
            onInput={redeemCodeInputCallback}
            status={redeemCodeStatus}
          />
          <Button text="Submit" appearance={{ priority: 'primary' }} onClick={redeemCodeSubmitCallback} />
        </div>
      </main>
      {isAlertVisible && <Alert type="red" heading={alertHeading} onClick={() => setIsAlertVisible(false)} />}
    </section>
  );
};
