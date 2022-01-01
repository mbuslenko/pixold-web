import { useLayoutEffect, useRef, useState } from 'react';

import { Button } from '../../components/button/Button';

import { isSmallScreen } from '../../shared/ts/helperFunctions';

import './FaqQuestion.scss';
import { IFaqQuestionProps } from './interfaces';
import { AnswerTextDomHeight } from './enums';

export const FaqQuestion: React.FC<IFaqQuestionProps> = ({ question, answer, showInfoModalCallback }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(false);

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
    // is it necessary to set [answerRef.current] ?
    [answerRef.current],
  );


  return (
    <div ref={answerRef}>
      <h3 className='faq-question-heading'>
        {question}
      </h3>
      <p className={`faq-question-text ${isTextOverflow && 'faq-short-text'}`}>
        {answer}
      </p>
      { isTextOverflow &&
        <Button
          text='Read more'
          appearance={{ priority: 'secondary', theme: 'black-white' }}
          addedClasses='faq-button-small'
          onClick={() => showInfoModalCallback(question, answer)}
        />
      }
    </div>
  );
};
