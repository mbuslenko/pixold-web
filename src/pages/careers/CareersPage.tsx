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
            We want to add to the team people with "burning eyes", which we are. So if you want to work at Pixold, but
            don't see a suitable role in the list on the right, feel free to email us at hello@pixold.io
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel
              ut. Posuere suscipit neque scelerisque libero.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis
            </p>
          </div>
        </CareerVacancy>
      </section>
    </>
  );
};
