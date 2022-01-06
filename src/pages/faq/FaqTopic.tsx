import './FaqTopic.scss';
import { FaqQuestion } from './FaqQuestion';
import { IFaqTopicProps } from './interfaces';

export const FaqTopic: React.FC<IFaqTopicProps> = ({ name, content, showInfoModalCallback }) => {
  return (
    <section className="faq-topic">
      <h2 className="faq-topic-heading">{name}</h2>
      <div className="faq-question-container">
        {content.map(({ question, answer }, index) => (
          <FaqQuestion question={question} answer={answer} showInfoModalCallback={showInfoModalCallback} key={index} />
        ))}
      </div>
    </section>
  );
};
