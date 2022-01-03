import { ErrorPage } from '../ErrorPage';

import './Error500Page.scss';
import error500Svg from '../../../assets/svg/500.svg';
import error500SvgVertical from '../../../assets/svg/500-vertical.svg';

export const Error500Page: React.FC = () => {
  return (
    <ErrorPage
      hexagonColor={'red'}
      backgroundSrc={error500Svg}
      verticalBackgroundSrc={error500SvgVertical}
      title="500"
    >
      <div className="error-500-desc">
        An error has occurred on the server. We already know about this and are doing our best to fix it.
      </div>
    </ErrorPage>
  );
};
