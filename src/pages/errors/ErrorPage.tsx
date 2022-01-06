import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { HexagonStrokeSvg } from '../../components/hexagonStrokeSvg/hexagonStrokeSvg';

import './ErrorPage.scss';
import { IErrorPageProps } from './interfaces';

export const ErrorPage: React.FC<IErrorPageProps> = ({ hexagonColor, backgroundSrc, verticalBackgroundSrc, title, children }) => {
  return (
    <section className="error-page">
      <HexagonStrokeSvg color={hexagonColor} className='hexagonTopLeft'/>
      <HexagonStrokeSvg color={hexagonColor} className='hexagonTopRight'/>
      <HexagonStrokeSvg color={hexagonColor} className='hexagonBottomRight'/>
      <HexagonStrokeSvg color={hexagonColor} className='hexagonBottomLeft'/>

      <img src={backgroundSrc} alt="Error" className="error-bg" />
      <img src={verticalBackgroundSrc} alt="Error" className="error-bg-vertical" />

      <main className="error-content">
        <h1 className="error-title">
          {title}
        </h1>
        {React.Children.map(children, (value) => value)}
        <div className="error-btn-wrap">
          <Link to="/home">
            <Button
              text="Home"
              appearance={{ priority: 'primary', theme: 'black-white' }}
            />
          </Link>
        </div>
      </main>
    </section>
  );
};
