import { Link } from 'react-router-dom';
import LogoImg from '@/shared/assets/images/logo.svg';
import styles from './logo.module.scss';

interface LogoProps {
  withLink?: boolean; //true, если хотим, чтобы компонент был ссылкой
}

export const Logo = ({ withLink }: LogoProps) =>
  withLink ? (
    <Link className={styles.icon} to='/'>
      <LogoImg />
    </Link>
  ) : (
    <LogoImg />
  );
