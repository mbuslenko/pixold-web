import { FaqQuestion } from './FaqQuestion';
import { IFaqTopicProps } from './interfaces';
import './FaqTopic.scss';

export const FaqTopic: React.FC<IFaqTopicProps> = ({ name, content }) => {
  return (
    <section className='faq-topic'>
      <h2 className='faq-topic-heading'>{name}</h2>
      <div className='question-container'>
        {content.map(({ question, answer }, i) => <FaqQuestion key={i} question={question} answer={answer} />)}
      </div>
    </section>
  );
};
