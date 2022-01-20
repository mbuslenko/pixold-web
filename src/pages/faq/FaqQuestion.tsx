import { useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { isScreen } from '../../shared/ts/helperFunctions';
import { ScreenMaxWidth } from '../../shared/ts/enums';

import { Button } from '../../components/button/Button';

import './FaqQuestion.scss';
import { IFaqQuestionProps } from './interfaces';
import { AnswerTextDomHeight } from './enums';

export const FaqQuestion: React.FC<IFaqQuestionProps> = ({ id, question, answer, showInfoModalCallback }) => {
  const questionRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(false);
  const { questionId } = useParams();

  useLayoutEffect(() => {
    const answerDomHeight = answerRef.current?.offsetHeight ?? 0;

    if (answerDomHeight > AnswerTextDomHeight.LARGE && !isScreen(ScreenMaxWidth.SMALL)) {
      setIsTextOverflow(true);

      return;
    }

    if (answerDomHeight > AnswerTextDomHeight.SMALL && isScreen(ScreenMaxWidth.SMALL)) {
      setIsTextOverflow(true);

      return;
    }

    if (id === questionId) {
      setTimeout(() => {
        questionRef.current?.scrollIntoView({ block: 'center' });
      }, 500);
    }
  }, [id, questionId]);

  return (
    <section id={id} ref={questionRef}>
      <h3 className="faq-question-heading">{question}</h3>
      <p ref={answerRef} className={`faq-question-text ${isTextOverflow && 'faq-short-text'}`}>
        {answer}
      </p>
      {isTextOverflow && (
        <Button
          text="Read more"
          appearance={{ priority: 'secondary', theme: 'black-white' }}
          className="faq-button-small"
          onClick={() => showInfoModalCallback(question, answer)}
        />
      )}
    </section>
  );
};
