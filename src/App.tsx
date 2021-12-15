import { useState } from 'react';
import './App.scss';
import Button from './components/button/Button';
import Checkbox from './components/checkbox/Checkbox';
import RadioBtn from './components/radioButton/RadioBtn';
import { ButtonStyles, InputsStyles } from './enums';

function App() {
  const [checkedOne, setCheckedOne] = useState<boolean>(false);

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
    </>
  );
}

export default App;
