import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Button } from '../../components/button/Button';

import { isScreen } from '../../shared/ts/helperFunctions';
import { ScreenMaxWidth } from '../../shared/ts/enums';

import './FaqQuestion.scss';
import { IFaqQuestionProps } from './interfaces';
import { AnswerTextDomHeight } from './enums';

export const FaqQuestion: React.FC<IFaqQuestionProps> = ({ id, question, answer, showInfoModalCallback }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(false);

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
  }, []);

  return (
    <section id={id}>
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
