import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { GetResponseUsernameCheck } from '../../shared/ts/types';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { InputStatus } from '../../components/types';

import './UsernamePage.scss';
import { redirect } from '../../shared/ts/helperFunctions';

export const UsernamePage: React.FC = () => {
  const navigate = useNavigate();
  const request = getAxiosInstance(navigate);

  const [username, setUsername] = useState<string>('');
  const [usernameStatus, setUsernameStatus] = useState<InputStatus>();

  const submitUsernameCallback = () => {
    if (username.length === 0 || usernameStatus === 'invalid') {
      setUsernameStatus('invalid');

      return;
    }

    request({
      requestConfig: {
        method: 'get',
        url: `/user/check/username/${username}`,
      },
      onResponse: submitUsernameResponseCallback,
      onError: () => setUsernameStatus('invalid'),
    });
  };

  const submitUsernameResponseCallback = (response: GetResponseUsernameCheck) => {
    if (!response.data.result) {
      setUsernameStatus('invalid');

      return;
    }

    setUsernameStatus('valid');

    request({
      requestConfig: {
        method: 'post',
        url: `/user/update/username`,
        data: { username },
      },
      onResponse: () => redirect(navigate, '/wallet'),
    });
  };

  const inputCallback = (text: string, status: InputStatus | undefined) => {
    setUsername(text);
    setUsernameStatus(status);
  };

  return (
    <section className="username-wrap">
      <h1 className="username-title">Set your username</h1>
      <main className="username-controls-wrap">
        <Input
          type="text"
          placeholder="Please enter username"
          description="Username"
          onInput={inputCallback}
          status={usernameStatus}
        />
        <Button
          text="Submit"
          appearance={{ priority: 'primary' }}
          onClick={submitUsernameCallback}
          className="username-btn-submit"
        />
      </main>
    </section>
  );
};
