import { useState } from 'react';
import { Button } from '../../components/ui-kit/button/Button';

import { Input } from '../../components/ui-kit/input/Input';

import './UsernamePage.scss';

export const UsernamePage: React.FC = () => {
  const [username, setUsername] = useState<string>('');

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
          />
        </div>
        <Button text="Check" priority="secondary" className="username-btn-check" />
        <div className="username-submit-wrap">
          <Button text="Submit" priority="primary" />
        </div>
      </div>
    </div>
  );
};
