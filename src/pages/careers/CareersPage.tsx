import { Button } from '../../components/button/Button';

import './CareersPage.scss';
import arrowDownSvg from '../../assets/svg/arrow-down.svg';
import { CareerVacancy } from './CareerVacancy';

export const CareersPage = () => {
  return (
    <>
      <section className="careers-page-intro">
        <header className="careers-page-header">Pixold Careers</header>
        <div className="careers-page-intro-content">
          <h1 className="careers-page-title">Join the team</h1>
          <p className="careers-page-desc">Even if you have little experience or skills</p>
          <a href="mailto:hello@pixold.io" target="_blank" rel="noreferrer noopener">
            <Button text="Contact us" appearance={{ priority: 'primary', theme: 'black' }} />
          </a>
        </div>
      </section>
      <section className="careers-page-vacancies">
        <div className="careers-page-open">
          <h2 className="careers-page-open-title">Open roles</h2>
          <p className="careers-page-open-desc">
            We are looking for people like us with «burning eyes» to join our team. So if you would
             like to work at Pixold but don't see a suitable position on the list, please contact us at hello@pixold.io
          </p>
        </div>
        <a href="#ui-vacancy" className="careers-page-arrow-down">
          <img src={arrowDownSvg} alt="Arrow down" />
        </a>
        <CareerVacancy
          id="ui-vacancy"
          className="careers-page-vacancy-ui-bg"
          title="UI/UX Designer"
          applyLink="hello@pixold.io"
        >
          <div>
            <h3 className="careers-page-vacancy-title-small">Description</h3>
            <p className="careers-page-vacancy-desc">
              Web designer with good knowledge of Figma, knowledge of modern UI/UX approaches for the Web and sense of style, composition, form and color. Portfolio is required.
            </p>
          </div>
        </CareerVacancy>
        <CareerVacancy className="careers-page-vacancy-back-bg" title="Backend Developer" applyLink="hello@pixold.io">
          <div>
            <h3 className="careers-page-vacancy-title-small">Language</h3>
            <p className="careers-page-vacancy-desc">Node.JS</p>
          </div>
          <div>
            <h3 className="careers-page-vacancy-title-small">Level</h3>
            <p className="careers-page-vacancy-desc">Trainee</p>
          </div>
          <div>
            <h3 className="careers-page-vacancy-title-small">Description</h3>
            <p className="careers-page-vacancy-desc">
              Developer with knowledge of Javascript or other OOP programming language, no commercial experience to work on a project with: TypeScript, NestJS and PostgreSQL
            </p>
          </div>
        </CareerVacancy>
      </section>
    </>
  );
};
