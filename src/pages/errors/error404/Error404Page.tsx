import { ErrorPage } from '../ErrorPage';

import './Error404Page.scss';
import error404Svg from '../../../assets/svg/404.svg';
import error404SvgVertical from '../../../assets/svg/404-vertical.svg';

export const Error404Page: React.FC = () => {
  return (
    <ErrorPage
      hexagonColor={'purple'}
      backgroundSrc={error404Svg}
      verticalBackgroundSrc={error404SvgVertical}
      title="404"
    >
      <div className="error-404-desc">Page not found</div>
    </ErrorPage>
  );
};
