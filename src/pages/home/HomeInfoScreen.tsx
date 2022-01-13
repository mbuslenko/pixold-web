import homeInfoBackground from '../../assets/svg/home-background-blur.svg';
import hexagonMap from '../../assets/svg/hexagon-map.svg';
import './HomeInfoScreen.scss';

export const HomeInfoScreen: React.FC = () => {
  return (
    <section className="home-info">
      <img src={homeInfoBackground} alt="" className="home-info-background" />
      <div className="home-info-content">
        <img src={hexagonMap} alt="" className="home-info-map" />
        <h2 className="home-info-heading">
          Build your kingdom <br /> on a real map
        </h2>
        <p className="home-info-text">
          Master the territory and earn money, defend yourself from the attackers or become the attacker yourself and
          rob your neighbors. The whole map of the real world is in your hands!
        </p>
      </div>
    </section>
  );
};
