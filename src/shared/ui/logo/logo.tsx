import { Link } from 'react-router-dom';
import styles from './logo.module.scss';
import logoSrc from '../../assets/images/logo.svg';

interface LogoProps {
  withLink?: boolean; //true, если хотим, чтобы компонент был ссылкой
  className?: string
}

export const Logo = ({ withLink, className = '' }: LogoProps) => {
  const logo = (
    <img 
     src={logoSrc}
     alt='SKILL SWAP'
     className={className}
      />
  );
  return withLink ? (
    <Link to='/'>
      {logo}
    </Link>
  ) : (
    logo
  );
};
