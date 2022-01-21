import { Button } from '../../components/button/Button';
import './CareersPage.scss';

export const CareersPage = () => {
  return (
    // <div className="careers-page">
    <>
      <section className="careers-page-team">
        <div className="careers-page-heading">Pixold Careers</div>
        <h1 className="careers-page-title">Join the team</h1>
        <p className="careers-page-desc">Even if you have little experience or skills</p>
        <Button text="Contact us" appearance={{ priority: 'primary', theme: 'white-black' }} />
      </section>
      <section className="careers-page-roles">
        <div className="careers-page-open">
          <h2 className="careers-page-open-title">Open roles</h2>
          <p className="careers-page-open-desc">
            We want to add to the team people with "burning eyes", which we are. So if you want to work at Pixold, but
            don't see a suitable role in the list on the right, feel free to email us at hello@pixold.io
          </p>
        </div>
        <div className="careers-page-vacancy">
          <h2 className="careers-page-vacancy-title">
            UI/UX <br />
            Designer
          </h2>
          <h3 className="careers-page-vacancy-title-small">Description</h3>
          <p className="careers-page-vacancy-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
            Posuere suscipit neque scelerisque libero.
          </p>
          <Button text="Apply" appearance={{ priority: 'primary', theme: 'white-black' }} />
        </div>
        <div className="careers-page-vacancy">
          <h2 className="careers-page-vacancy-title">
            Backend
            <br /> Developer
          </h2>
          <h3 className="careers-page-vacancy-title-small">Language</h3>
          <p className="careers-page-vacancy-desc">Node.JS</p>
          <h3 className="careers-page-vacancy-title-small">Level</h3>
          <p className="careers-page-vacancy-desc">Trainee</p>
          <h3 className="careers-page-vacancy-title-small">Description</h3>
          <p className="careers-page-vacancy-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis
          </p>
          <Button text="Apply" appearance={{ priority: 'primary', theme: 'white-black' }} />
        </div>
      </section>
    </>
    /* </div> */
  );
};
