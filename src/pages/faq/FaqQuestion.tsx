import { useLayoutEffect, useRef, useState } from 'react';
import { IFaqQuestionProps } from './interfaces';
import './FaqQuestion.scss';
import { Button } from '../../components/ui-kit/button/Button';

export const FaqQuestion: React.FC<IFaqQuestionProps> = ({ question, answer, showInfoModalCallback }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const [isVisibleButton, setIsVisibleButton] = useState<boolean>(false);

  // useLayoutEffect or useEffect
  useLayoutEffect(
    () => {
      const answerDomHeight = answerRef.current?.offsetHeight ?? 0;

      if (answerDomHeight > 250) {
        setIsVisibleButton(true);
      }
    },
    [answerRef.current],
  );


  return (
    <div
      className='faq-question'
      ref={answerRef}
    >
      <h3 className='faq-question-heading'>
        {question}
      </h3>
      <p className={`faq-question-text ${isVisibleButton && 'short-text'}`}>
        {answer}
      </p>
      { isVisibleButton &&
        <Button
          text='Read more'
          priority='secondary'
          className='faq-secondary-button-color'
          onClick={() => showInfoModalCallback(question, answer)}
        />
      }
    </div>
  );
};
