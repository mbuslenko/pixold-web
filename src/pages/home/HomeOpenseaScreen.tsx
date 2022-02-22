import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetResponseHexagonFree } from '../../shared/ts/types';

import { Button } from '../../components/button/Button';

import './HomeOpenseaScreen.scss';
import hexagonCardImg from '../../assets/svg/hexagon-card.svg';
import hexagonCardBackgroundImg from '../../assets/svg/hexagon-card-background.svg';
import hexagonScreenCardImg from '../../assets/svg/hexagon-screen-card.svg';
import { prepareRequest } from '../../shared/ts/clientCommunication';
import { useAppDispatch } from '../../store/store';

export const HomeOpenseaScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [hexagonInfo, setHexagonInfo] = useState<GetResponseHexagonFree['data']>();

  useEffect(() => {
    prepareRequest(
      navigate,
      dispatch,
    )({
      requestConfig: {
        method: 'get',
        url: '/hexagon/one-free',
      },
      onResponse: (response: GetResponseHexagonFree) => setHexagonInfo(response.data),
    });
  }, [dispatch, navigate]);

  return (
    <section className="opensea-screen">
      <div className="opensea-screen-info">
        <h2 className="opensea-screen-info-heading">Make the game a reality</h2>
        <p className="opensea-screen-info-text">
          After buying a hexagon on the NFT marketplace, you will receive a code that you can redeem in the game so that
          you get a hexagon in your territory. It can be resold at any time, each new owner will receive a hexagon with
          the same level and characteristics as the previous one.
        </p>
      </div>
      <div className="opensea-card-container">
        <img className="card-image" alt="" src={hexagonScreenCardImg} />
        <img className="opensea-card-background" alt="" src={hexagonCardBackgroundImg} />
        <article className="opensea-card-border">
          <div className="opensea-card">
            <img className="opensea-card-hexagon" alt="" src={hexagonCardImg} />
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
          </div>
        </article>
      </div>
      <a
        className="opensea-screen-purchase-link"
        target="_blank"
        rel="noreferrer noopener"
        href={hexagonInfo?.purchaseLink ?? ''}
      >
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
