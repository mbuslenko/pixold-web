import { Button } from '../../../components/button/Button';
import { Dropdown } from '../../../components/dropdown/Dropdown';
import { Input } from '../../../components/input/Input';

import { WalletSwitchProps } from '../interfaces';

import './WalletSwitch.scss';

export const WalletSwitch: React.FC<WalletSwitchProps> = ({ onSubmit }) => {
  return (
    <section className='wallet-switch-container'>
      <div className='wallet-switch-input-container'>
        <h2 className='wallet-switch-heading'>
          Switch balance
        </h2>
        <Dropdown
          placeholder='From'
          options={[]}
          disabled
          onChange={value => console.log(`from: ${value}`)}
        />
        <Dropdown
          placeholder='To'
          options={[]}
          disabled
          onChange={value => console.log(`to: ${value}`)}
        />
        <Input
          type='text'
          placeholder='Please enter amount'
          description='Amount'
          status='disabled'
          onInputCallback={value => console.log(`amount: ${value}`)}
        />
      </div>
      <Button
        text='Submit'
        appearance={{ priority: 'primary' }}
        disabled
        onClick={onSubmit}
      />
    </section>
  );
};
