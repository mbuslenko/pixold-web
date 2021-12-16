import { useState } from 'react';
import './App.scss';
import Button from './components/button/Button';
import Checkbox from './components/checkbox/Checkbox';
import Dropdown from './components/Dropdown/Dropdown';
import RadioBtn from './components/radioButton/RadioBtn';
import Toggle from './components/toggle/Toggle';
import { ButtonStyles, InputsStyles } from './enums';

function App() {
  const [checkedOne, setCheckedOne] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  return (
    <>
      <div className="App">Pixold-web</div>
      <div className="buttons">
        <Button textContent="Agree" styles={ButtonStyles.primary} action={() => {}} />
        <Button textContent="Cancel" styles={ButtonStyles.secondary} action={() => {}} />
      </div>
      <div>
        <RadioBtn className={InputsStyles.default} textContent="566655" />
        <RadioBtn className={InputsStyles.purple} textContent="fgfgffggf" />
      </div>
      <div>
        <Checkbox
          className={InputsStyles.default}
          textContent="dfgdfgdfgd"
          value={checkedOne}
          onChange={handleChangeOne}
        />
      </div>
      <div>
        <Toggle
          className={InputsStyles.default}
          textContent="dfgdfgdfgd"
          value={checkedOne}
          onChange={handleChangeOne}
        />
      </div>
      <div>
        <Dropdown
          title="Please Pick Something"
          items={[
            { id: 1, name: 'Work it harder' },
            { id: 2, name: 'Make it better' },
            { id: 3, name: 'Do it faster' },
            { id: 4, name: 'Makes us stronger' },
          ]}
          value={value}
          onChange={(val: string) => setValue(val)}
        />
      </div>
    </>
  );
}

export default App;
