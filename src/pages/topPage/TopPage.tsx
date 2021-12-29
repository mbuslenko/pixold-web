import { Button } from '../../components/ui-kit/button/Button';

import './TopPage.scss';

/* interface ICellContent {
  content: string | number;
}

export const Cell: React.FC<ICellContent> = ({ content }) => {
  return <div>{content}</div>;
}; */

export const TopPage: React.FC = () => {
  return (
    <div className="top-wrap">
      <div className="top-content">
        <div className="top-back-wrap">
          <Button text="← Back to game" priority="secondary" className="top-back" />
        </div>
        <div className="top-info">
          <h1 className="top-title">Top Players page</h1>
          <div className="top-desc">Will be soon</div>
          <div className="top-table">
            <div className="top-cell cell-1"></div>
            <div className="top-cell cell-1"></div>
            <div className="top-cell cell-1"></div>
            <div className="top-cell cell-1"></div>
            <div className="top-cell cell-1"></div>
            <div className="top-cell cell-1"></div>
            <div className="top-cell cell-1"></div>
            <div className="top-cell cell-1"></div>
            <div className="top-cell cell-2"></div>
            <div className="top-cell cell-2"></div>
            <div className="top-cell cell-2"></div>
            <div className="top-cell cell-2"></div>
            <div className="top-cell cell-2"></div>
            <div className="top-cell cell-2"></div>
            <div className="top-cell cell-2"></div>
            <div className="top-cell cell-2"></div>
            <div className="top-cell cell-3"></div>
            <div className="top-cell cell-3"></div>
            <div className="top-cell cell-3"></div>
            <div className="top-cell cell-3"></div>
            <div className="top-cell cell-3"></div>
            <div className="top-cell cell-3"></div>
            <div className="top-cell cell-3"></div>
            <div className="top-cell cell-3"></div>
          </div>
        </div>
        <div className="top-show-wrap">
          <Button text="Sign up for preview" priority="primary" className="top-show" />
        </div>
      </div>
    </div>
  );
};
