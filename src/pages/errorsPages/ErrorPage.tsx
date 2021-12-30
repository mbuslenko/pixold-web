import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/ui-kit/button/Button';

import './ErrorPage.scss';
import { IErrorPage } from './interfaces';

const ErrorPage: React.FC<IErrorPage> = ({ hexagonSrc, backgroundSrc, verticalBackgroundSrc, title, children }) => {
  return (
    <div className="error-wrap">
      <img src={hexagonSrc} alt="Hexagon" className="hexagon1" />
      <img src={hexagonSrc} alt="Hexagon" className="hexagon2" />
      <img src={hexagonSrc} alt="Hexagon" className="hexagon3" />
      <img src={hexagonSrc} alt="Hexagon" className="hexagon4" />
      <img src={backgroundSrc} alt="Error" className="error-svg" />
      <img src={verticalBackgroundSrc} alt="Error" className="error-vertical" />
      <div className="error-content">
        <h1 className="error-title">{title}</h1>
        {React.Children.map(children, (value) => value)}
        <div className="error-btn-wrap">
          <Link to="/home">
            <Button text="Home" priority="primary" className="error-btn" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
