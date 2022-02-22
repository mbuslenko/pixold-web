import { Button } from '../../../components/button/Button';

import { IPlayPopupInfoMaintenanceProps } from './interfaces';

export const PlayPopupInfoMaintenance: React.FC<IPlayPopupInfoMaintenanceProps> = ({
  heading,
  text,
  buttonText,
  buttonClassName,
  isDisabledButton,
  buttonCallback,
}): JSX.Element => {
  return (
    <>
      <div>
        <h3 className="play-popup-content-heading">{heading}</h3>
        <p className="play-popup-content-text">{text}</p>
      </div>
      <Button
        text={buttonText}
        className={buttonClassName}
        appearance={{ priority: 'secondary' }}
        disabled={isDisabledButton}
        onClick={buttonCallback}
      />
    </>
  );
};
