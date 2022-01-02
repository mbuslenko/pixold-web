import { Button } from '../../components/ui-kit/button/Button';
import { Input } from '../../components/ui-kit/input/Input';
import './RedeemCode.scss';

export const RedeemCode: React.FC = () => {
  const redeemCodeInputCallback = () => {
    console.log('input');
  };

  return (
    <div className="redeem-wrap">
      <div className="redeem-content-wrap">
        <h1 className="redeem-title">Redeem code</h1>
        <p className="redeem-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut.
          Posuere suscipit neque scelerisque libero.
        </p>

        <div className="redeem-input-wrap">
          <Input
            type="text"
            placeholder="Please enter your code"
            description="Your code"
            onInputCallback={redeemCodeInputCallback}
          />
          <div className="redeem-btn-wrap">
            <Button text="Submit" priority="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
