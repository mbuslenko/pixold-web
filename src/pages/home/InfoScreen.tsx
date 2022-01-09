import './InfoScreen.scss';

export const InfoScreen: React.FC = () => {
  return (
    <section className="home-info">
      <div className="home-info-content">
        <div className="home-info-bg" />
        <div className="home-info-description">
          <h2 className="home-info-title">There will be a header</h2>
          <p className="home-info-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
            Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo
            sed elementum congue consequat.
          </p>
        </div>
      </div>
    </section>
  );
};
