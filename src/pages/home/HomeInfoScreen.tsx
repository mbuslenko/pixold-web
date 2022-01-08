import hexagonMap from '../../assets/svg/hexagon-map.svg';
import './HomeInfoScreen.scss';

export const HomeInfoScreen: React.FC = () => {
  return (
    <section className="home-info">
      <div className="home-info-content">
        <img src={hexagonMap} alt='' className="home-info-map" />
        <h2 className="home-info-heading">There will be a header</h2>
        <p className="home-info-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
          Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed
          elementum congue consequat.
        </p>
      </div>
    </section>
  );
};
