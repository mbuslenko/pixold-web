import React from 'react';

import './PreloaderPage.scss';
import loaderLogo from '../../assets/svg/loader-logo.svg';

const PreloaderPage: React.FC = () => {
  /*  const [isLoading, setIsLoading] = useState<boolean>(false); */

  return (
    <>
      <div className="loader-wrap">
        <img src={loaderLogo} alt="loader Logo" className="loader-logo" />
        <div className="loader-text">Loading...</div>
      </div>
    </>
  );
};

export default PreloaderPage;
