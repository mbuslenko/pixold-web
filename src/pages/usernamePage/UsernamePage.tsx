import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetResponseUsernameCheck } from '../../shared/ts/types';

import { useAxiosInstance } from '../../components/AxiosInstance';
import { Button } from '../../components/ui-kit/button/Button';
import { Input } from '../../components/ui-kit/input/Input';
import { InputStatus } from '../../components/ui-kit/type';

import './UsernamePage.scss';

export const UsernamePage: React.FC = () => {
  const navigate = useNavigate();
  const request = useAxiosInstance(navigate);

  const [username, setUsername] = useState<string>('');
  const [usernameStatus, setUsernameStatus] = useState<InputStatus>();

  const checkPostErrorCallback = () => {
    setUsernameStatus('invalid');
  };

  const checkUsernameCallback = () => {
    request({
      requestMethod: "get",
      requestUrl: `/user/check/username/${username}`,
      responseCallback: checkPostResponseCallback,
      errorCallback: checkPostErrorCallback,
    });
  };

  const checkPostResponseCallback = (response: GetResponseUsernameCheck) => {
    if (response.data.result === true) {
      setUsernameStatus('valid');
    } else {
      setUsernameStatus('invalid');
    }
  };

  const onInputCallback = (text: string, status: InputStatus | undefined) => {
    setUsername(text);
    setUsernameStatus(status);
  };

  const submitCallback = () => {
    if (usernameStatus === 'invalid') {
      return;
    } else {
      request({
        requestMethod: "post",
        requestUrl: `/user/update/username`,
        requestData: { username },
        responseCallback: () => navigate('/wallet'),
        errorCallback: checkPostErrorCallback,
      });
    }
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
            onInputCallback={onInputCallback}
            status={usernameStatus}
          />
        </div>
        <Button text="Check" priority="secondary" className="username-btn-check" onClick={checkUsernameCallback} />
        <div className="username-submit-wrap">
          <Button text="Submit" priority="primary" onClick={submitCallback} />
        </div>
      </div>
    </div>
  );
};
