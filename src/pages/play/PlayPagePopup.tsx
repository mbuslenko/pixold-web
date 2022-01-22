import { TabbedButtonGroup } from '../../components/tabbedButtonGroup/TabbedButtonGroup'
import { IPlayPagePopupProps } from './interfaces'

export const PlayPagePopup: React.FC<IPlayPagePopupProps> = ({ closePopupCallback }) => {

  return (
    <section className='play-page-popup'>
      <TabbedButtonGroup name={''} options={[]} onChange={function (value: string): void {/*  */}}/>
      <button onClick={closePopupCallback}>X</button>
    </section>
  );
};
