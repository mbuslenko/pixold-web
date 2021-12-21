import React from 'react';
import { Button } from '../../ui-kit/button/Button';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content"></div>
        </div>
      </header>
      <div className="start-wrap">
        <section className="start">
          <div className="logo"></div>
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
      <section className="info">
        <div className="info-content">
          <div className="info-bg"></div>
          <div className="info-description">
            <h2 className="info-title">There will be a header</h2>
            <p className="info-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel
              ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus.
              Commodo sed elementum congue consequat.
            </p>
          </div>
        </div>
      </section>
      <section className="polygons">
        <div className="container">
          <div className="polygons-content">
            <h2 className="info-title polygon-title">There will be a header</h2>
            <div className="polygon-attack">
              <div className="polygon-attack-bg"></div>
              <div className="polygon-title-card">Attack</div>
              <div className="polygon-btn">
                <Button
                  text="Read more"
                  // styles={ButtonStyles.red}
                  priority='secondary'
                  onClick={() => {
                    console.log('Read more');
                  }}
                />
              </div>
            </div>
            <div className="polygon-miner">
              <div className="polygon-miner-bg"></div>
              <div className="polygon-title-card">Miner</div>
              <div className="polygon-btn">
                <Button
                  text="Read more"
                  priority='secondary'
                  onClick={() => {
                    console.log('Read more');
                  }}
                />
              </div>
            </div>
            <div className="polygon-defender">
              <div className="polygon-defender-bg"></div>
              <div className="polygon-title-card">Defender</div>
              <div className="polygon-btn">
                <Button
                  text="Read more"
                  priority='secondary'
                  onClick={() => {
                    console.log('Read more');
                  }}
                />
              </div>
            </div>
            <div className="polygon-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel
              ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus.
              Commodo sed elementum congue consequat.
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-content-wrap">
          <div className="footer-text1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
            Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo
            sed elementum congue consequat.
          </div>
          <div className="footer-text2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
            Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo
            sed elementum congue consequat.
          </div>

          <div className="footer-wrap">
            <div className="footer-logo"></div>
            <div className="footer-year">2022</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
