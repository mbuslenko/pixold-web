import './App.scss';
import Button from './components/button/Button';
import Checkbox from './components/checkbox/Checkbox';
import RadioBtn from './components/radioButton/RadioBtn';
import { ButtonStyles, RadioBtnStyles } from './enums';

function App() {
  return (
    <>
      <div className="App">Pixold-web</div>
      <div className="buttons">
        <Button textContent="Agree" styles={ButtonStyles.primary} action={() => {}} />
        <Button textContent="Cancel" styles={ButtonStyles.secondary} action={() => {}} />
      </div>
      <div>
        <RadioBtn className={RadioBtnStyles.default} textContent="566655" />
        <RadioBtn className={RadioBtnStyles.purple} textContent="fgfgffggf" />
      </div>
      <div>
        <Checkbox />
      </div>
    </>
  );
}

export default App;
