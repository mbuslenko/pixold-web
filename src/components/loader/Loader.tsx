import styles from './Loader.module.scss';
import loaderLogo from '../../assets/svg/loader-logo.svg';

export const Loader: React.FC = () => {
  return (
    <article className={styles['loader']}>
      <img src={loaderLogo} alt="loader Logo" className={styles['loader-logo']} />
      <span className={styles['loader-text']}>Loading...</span>
    </article>
  );
};
