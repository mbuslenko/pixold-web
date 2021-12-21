import { Button } from '../../components/ui-kit/button/Button';

export const StartScreen: React.FC = () => {
  return (
    <div className="start-wrap">
      <section className="start">
        <h1 className="title">There will be a slogan</h1>
        <div className="wrap-btn">
          <Button
            text="Get started"
            priority='primary'
            onClick={() => {
              console.log('Get started');
            }}
          />
        </div>
      </section>
    </div>
  );
};
