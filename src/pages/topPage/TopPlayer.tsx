import { ITopPlayerProps } from './interfaces';

export const TopPlayer: React.FC<ITopPlayerProps> = ({ username, place, score }) => {
  return (
    <>
      <div className="top-cell">{username}</div>
      <div className="top-cell cell-2">{place}</div>
      <div className="top-cell">{score}</div>
    </>
  );
};
