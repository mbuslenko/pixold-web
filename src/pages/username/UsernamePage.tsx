import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { GetResponseUsernameCheck } from '../../shared/ts/types';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { InputStatus } from '../../components/types';

import './UsernamePage.scss';
import { redirect } from '../../shared/ts/helperFunctions';
import { prepareRequest } from '../../shared/ts/clientCommunication';
import { useDispatch } from 'react-redux';

export const UsernamePage: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [usernameStatus, setUsernameStatus] = useState<InputStatus>();

  const request = prepareRequest(navigate, dispatch);

  const submitUsernameCallback = () => {
    if (username.length === 0 || usernameStatus === 'invalid' || /[^\w^_^\d]/.test(username)) {
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
      onResponse: () => {
        localStorage.setItem('username', username);
        redirect(navigate, '/play');
      },
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
          defaultValue={localStorage.getItem('username') ?? ''}
        />
        <div className="username-button-container">
          <Button
            text="Submit"
            appearance={{ priority: 'primary' }}
            onClick={submitUsernameCallback}
            className="username-btn-submit"
          />
          <Link to={'/settings'}>
            <Button text="Cancel" appearance={{ priority: 'secondary' }} />
          </Link>
        </div>
      </main>
    </section>
  );
};
