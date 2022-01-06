import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';

export const PlayPage: React.FC = () => {
  return (
    <section className='play-page'>
      <PlayMenu />
      <main></main>
    </section>
  );
};
