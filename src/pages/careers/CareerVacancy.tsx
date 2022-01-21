import { Button } from '../../components/button/Button';

import './CareerVacancy.scss';
import { ICareerVacancyProps } from './interfaces';

export const CareerVacancy: React.FC<ICareerVacancyProps> = ({ id, title, children, applyLink, className }) => {
  return (
    <article className={`careers-page-vacancy ${className ?? ''}`} id={id}>
      <h2 className="careers-page-vacancy-title">{title}</h2>
      <div className="careers-page-vacancy-content">{children}</div>
      <a href={`mailto:${applyLink}`} target="_blank" rel="noreferrer noopener">
        <Button text="Apply" appearance={{ priority: 'primary', theme: 'black' }} />
      </a>
    </article>
  );
};
