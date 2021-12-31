import './Game.scss';
import { GameMenu } from './GameMenu';

export const Game: React.FC = () => {
  return (
    <section className='game-page'>
      <main></main>
      <GameMenu />
    </section>
  );
};
