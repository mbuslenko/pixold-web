import { FaqQuestion } from './FaqQuestion';
import { IFaqTopicProps } from './interfaces';
import './FaqTopic.scss';

export const FaqTopic: React.FC<IFaqTopicProps> = ({ name, content, showInfoModalCallback }) => {
  return (
    <section className='faq-topic'>
      <h2 className='faq-topic-heading'>
        {name}
      </h2>
      <div className='question-container'>
        {content.map(({ question, answer }, index) => (
          <div className='question-wrapper'>
            <FaqQuestion
              key={index}
              question={question}
              answer={answer}
              showInfoModalCallback={showInfoModalCallback}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
