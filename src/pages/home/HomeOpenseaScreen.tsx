import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAxiosInstance } from '../../shared/ts/axiosInstance';
import { GetResponseHexagonFree } from '../../shared/ts/types';

import { Button } from '../../components/button/Button';

import './HomeOpenseaScreen.scss';
import hexagonCardImg from '../../assets/svg/hexagon-card.svg';
import hexagonCardBackgroundImg from '../../assets/svg/hexagon-card-background.svg';
import hexagonScreenCardImg from '../../assets/svg/hexagon-screen-card.svg';

export const HomeOpenseaScreen: React.FC = () => {
  const request = useAxiosInstance(useNavigate());
  const [hexagonInfo, setHexagonInfo] = useState<GetResponseHexagonFree['data']>();

  useEffect(() => {
    request({
      requestConfig: {
        method: 'get',
        url: '/hexagon/one-free',
      },
      onResponse: (response: GetResponseHexagonFree) => setHexagonInfo(response.data),
    });
  }, []);

  return (
    <section className="opensea-screen">
      <div className="opensea-screen-content">
        <h2 className="opensea-screen-heading">There will be a header</h2>
        <p className="opensea-screen-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
          Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed
          elementum congue consequat.
        </p>
      </div>
      <div className="opensea-card-container">
        <img className="opensea-background-card" src={hexagonScreenCardImg} />
        <img className="opensea-card-background" src={hexagonCardBackgroundImg} />
        <div className="opensea-card-border">
          <article className="opensea-card">
            <img className="opensea-card-img" src={hexagonCardImg} />
            <div className="opensea-card-content">
              <h3 className="opensea-card-name">{hexagonInfo?.name}</h3>
              <div className="opensea-card-info">
                <p className="opensea-card-info-text">PIXOLD.IO</p>
                <div>
                  <h4 className="opensea-card-info-heading">Current bid</h4>
                  <p className="opensea-card-info-text">{hexagonInfo?.bid}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <a className="opensea-screen-purchase-link" target="_blank" href={hexagonInfo?.purchaseLink ?? ''}>
        <Button
          className="opensea-screen-purchase-button"
          text="Purchase on OpenSea"
          appearance={{ priority: 'primary', theme: 'opensea-white' }}
        />
        <Button
          className="opensea-screen-purchase-button-small"
          text="Purchase on OpenSea"
          appearance={{ priority: 'primary', theme: 'opensea-black' }}
        />
      </a>
    </section>
  );
};
