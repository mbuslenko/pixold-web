import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetResponseUsernameCheck } from '../../shared/ts/types';
import { useAxiosInstance } from '../../shared/ts/axiosInstance';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { InputStatus } from '../../components/types';

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
      requestConfig: {
        method: 'get',
        url: `/user/check/username/${username}`,
      },
      onResponse: checkPostResponseCallback,
      onError: checkPostErrorCallback,
    });
  };

  const checkPostResponseCallback = (response: GetResponseUsernameCheck) => {
    if (response.data.result) {
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
    }

    request({
      requestConfig: {
        method: 'post',
        url: `/user/update/username`,
        data: { username },
      },
      onResponse: () => navigate('/wallet'),
      onError: checkPostErrorCallback,
    });
  };

  return (
    <section className="username-wrap">
      <h1 className="username-title">Set your username</h1>
      <main className="username-controls-wrap">
        <div className="username-input-wrap">
          <Input
            type="text"
            placeholder="Please enter username"
            description="Username"
            onInput={onInputCallback}
            status={usernameStatus}
          />
        </div>
        <Button
          text="Check"
          appearance={{ priority: 'secondary', theme: 'black-white' }}
          onClick={checkUsernameCallback}
        />
        <Button
          text="Submit"
          appearance={{ priority: 'primary' }}
          onClick={submitCallback}
          className="username-btn-submit"
        />
      </main>
    </section>
  );
};
