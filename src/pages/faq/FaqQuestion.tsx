import { useLayoutEffect, useRef, useState } from 'react';
import { IFaqTopicDataContent } from './interfaces';
import './FaqQuestion.scss';
import { Button } from '../../components/ui-kit/button/Button';
import { Modal } from '../../components/ui-kit/modal/Modal';

export const FaqQuestion: React.FC<IFaqTopicDataContent> = ({ question, answer }) => {
  const questionRef = useRef<HTMLDivElement>(null);
  const [isVisibleButton, setIsVisibleButton] = useState<boolean>(false);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  // useLayoutEffect or useEffect
  useLayoutEffect(
    () => {
      if ((questionRef.current?.offsetHeight ?? 0) > 318) {
        return setIsVisibleButton(true);
      }
    },
    [questionRef.current]
  );


  return (
    <div
      className='faq-question'
      ref={questionRef}
    >
      <h3 className='faq-question-heading'>{question}</h3>
      <p className='faq-question-text'>{answer}</p>
      { isVisibleButton &&
        <Button
          text='Read more'
          priority='secondary'
          className='faq-secondary-button-color'
          onClick={() => setIsVisibleModal(true)}
        />
      }
      { isVisibleModal &&
        <Modal
          heading={question}
          text={answer}
        >
          <Button
            text='Close'
            priority='secondary'
            className='faq-secondary-button-color'
            onClick={() => setIsVisibleModal(false)}
          />
        </Modal>
      }
    </div>
  );
};
