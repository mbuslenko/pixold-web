import { useEffect, useState } from 'react';

import { INumberAnimationProps } from '../interfaces';

export const NumberAnimation: React.FC<INumberAnimationProps> = ({ number }) => {
  const [counter, setCounter] = useState<number>(0);

  const counterStep = Math.ceil(number / 100);

  useEffect(() => {
    if (counter >= number) {
      if (counter > number) {
        setCounter(number);
      }

      return;
    }

    const timeout = setTimeout(() => setCounter(counter + counterStep), 10);

    return () => clearTimeout(timeout);
  }, [counter, number, counterStep]);

  return <>{counter}</>;
};
