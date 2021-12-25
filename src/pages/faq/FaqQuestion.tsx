import { useLayoutEffect, useRef, useState } from 'react';
import { IFaqQuestionProps } from './interfaces';
import './FaqQuestion.scss';
import { Button } from '../../components/ui-kit/button/Button';
import { isSmallScreen } from '../../shared/ts/helperFunctions';
import { AnswerTextDomHeight } from './enums';

export const FaqQuestion: React.FC<IFaqQuestionProps> = ({ question, answer, showInfoModalCallback }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(false);

  // useLayoutEffect or useEffect
  useLayoutEffect(
    () => {
      const answerDomHeight = answerRef.current?.offsetHeight ?? 0;

      if (answerDomHeight > AnswerTextDomHeight.LARGE && !isSmallScreen()) {
        setIsTextOverflow(true);

        return;
      }

      if (answerDomHeight > AnswerTextDomHeight.SMALL && isSmallScreen()) {
        setIsTextOverflow(true);

        return;
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
      <p className={`faq-question-text ${isTextOverflow && 'short-text'}`}>
        {answer}
      </p>
      { isTextOverflow &&
        <Button
          text='Read more'
          priority='secondary'
          className='faq-secondary-button-color'
          mediaClassName='mobile-faq-button'
          onClick={() => showInfoModalCallback(question, answer)}
        />
      }
    </div>
  );
};
