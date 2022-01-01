import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="home-footer">
      <p className="home-footer-top-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
        Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed
        elementum congue consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
        Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed
        elementum congue consequat.
      </p>

      <div className="home-footer-wrap">
        <div className="home-footer-logo" />
        <p className="home-footer-year">2022</p>
      </div>
    </footer>
  );
};
