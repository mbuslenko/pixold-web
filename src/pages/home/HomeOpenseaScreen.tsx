import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAxiosInstance } from '../../shared/ts/axiosInstance';
import { GetResponseHexagonFree } from '../../shared/ts/types';

import { Button } from '../../components/button/Button';

import './HomeOpenseaScreen.scss';
import hexagonCardImg from '../../assets/svg/hexagon-card.svg';
import hexagonBackgroundCardImg from '../../assets/svg/hexagon-background-card.svg';

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
        <img className="opensea-background-card" src={hexagonBackgroundCardImg} />
        <article className="opensea-card">
          <img className="opensea-card-img" src={hexagonCardImg} />
          <div className="opensea-card-text">
            <h3 className="opensea-card-name">{hexagonInfo?.name}</h3>
            <div className="opensea-card-info">
              <div>
                <h4>Current bid</h4>
                <p>{hexagonInfo?.bid}</p>
              </div>
              <div>
                <h4>Ending in</h4>
                <p>52m 20s</p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <a className="opensea-screen-purchase-link" target="_blank" href={hexagonInfo?.purchaseLink ?? ''}>
        <Button text="Purchase on OpenSea" appearance={{ priority: 'primary', theme: 'opensea-white' }} />
      </a>
    </section>
  );
};
