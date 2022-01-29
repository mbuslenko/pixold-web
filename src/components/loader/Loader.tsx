import styles from './Loader.module.scss';
import loaderLogo from '../../assets/svg/loader-logo.svg';
import { ILoaderProps } from '../interfaces';

export const Loader: React.FC<ILoaderProps> = ({ className }) => {
  return (
    <article className={`${styles['loader']} ${className ?? ''}`}>
      <img src={loaderLogo} alt="loader Logo" className={styles['loader-logo']} />
      <span className={styles['loader-text']}>Loading...</span>
    </article>
  );
};
