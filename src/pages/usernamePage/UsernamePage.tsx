import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosInstance } from '../../components/AxiosInstance';

import { Button } from '../../components/ui-kit/button/Button';
import { Input } from '../../components/ui-kit/input/Input';
import { InputStatus } from '../../components/ui-kit/type';

import './UsernamePage.scss';

export const UsernamePage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [usernameStatus, setUsernameStatus] = useState<InputStatus>();

  const [sendCheckRequest, setSendCheckRequest] = useState<boolean>(false);
  const [sendSubmitRequest, setSendSubmitRequest] = useState<boolean>(false);

  const checkPostErrorCallback = () => {
    setUsernameStatus('invalid');
  };

  const checkUsernameCallback = () => {
    setSendCheckRequest(true);
  };

  const checkPostResponseCallback = (response: any) => {
    if (response.data.result === true) {
      setUsernameStatus('valid');
    } else {
      setUsernameStatus('invalid');
    }

    setSendCheckRequest(false);
  };

  const submitCallback = () => {
    if (usernameStatus === 'invalid') {
      return;
    } else {
      setSendSubmitRequest(true);
    }
  };

  const submitResponseCallback = () => {
    navigate('/wallet');
  };

  return (
    <div className="username-wrap">
      <h1 className="username-title">Set your username</h1>
      <div className="username-controls-wrap">
        <div className="username-input-wrap">
          <Input
            type="text"
            placeholder="Please enter username"
            description="Username"
            onInputCallback={(text) => setUsername(text)}
            status={usernameStatus}
          />
        </div>
        <Button text="Check" priority="secondary" className="username-btn-check" onClick={checkUsernameCallback} />
        <div className="username-submit-wrap">
          <Button text="Submit" priority="primary" onClick={submitCallback} />
        </div>
      </div>

      {sendCheckRequest && (
        <AxiosInstance
          requestMethod="get"
          requestUrl={`/user/check/username/${username}`}
          responseCallback={checkPostResponseCallback}
          errorCallback={checkPostErrorCallback}
        />
      )}

      {sendSubmitRequest && (
        <AxiosInstance
          requestMethod="post"
          requestUrl={`/user/update/username`}
          requestData={{ username }}
          responseCallback={submitResponseCallback}
          errorCallback={checkPostErrorCallback}
        />
      )}
    </div>
  );
};
