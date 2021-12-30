import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetResponseUsernameCheck } from '../../shared/ts/types';

import { useAxiosInstance } from '../../shared/ts/axiosInstance';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { InputStatus } from '../../components/type';

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
      onResponse: checkPostResponseCallback,
      onError: checkPostErrorCallback,
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
        onResponse: () => navigate('/wallet'),
        onError: checkPostErrorCallback,
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
        <Button
          text="Check"
          appearance={{ priority: 'secondary', theme: 'black-white' }}
          onClick={checkUsernameCallback}
        />
        <div className="username-submit-wrap">
          <Button
            text="Submit"
            appearance={{ priority: 'primary' }}
            onClick={submitCallback}
          />
        </div>
      </div>
    </div>
  );
};
