import { ILinkToFaqProps } from '../interfaces';
import styles from './LinkToFaq.module.scss';

export const LinkToFaq: React.FC<ILinkToFaqProps> = ({ questionId, children }) => {
  return (
    <a href={`/faq/${questionId}`} className={styles.link}>
      {children}
    </a>
  );
};
