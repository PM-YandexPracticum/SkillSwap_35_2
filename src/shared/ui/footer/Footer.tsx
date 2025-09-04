import { Link } from 'react-router-dom';
import { Logo } from '../logo/logo';
import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <Logo />
    <nav className={styles.footerNavBlock}>
      <Link to='/about'>О проекте</Link>
      <Link to='/contacts'>Контакты</Link>
      <Link to='/policy'>Политика конфиденциальности</Link>
      <Link to='/skills'>Все навыки</Link>
      <Link to='/blog'>Блог</Link>
      <Link to='/agreement'>Пользовательское соглашение</Link>
    </nav>
    <div className={styles.footerSignature}>SkillSwap — 2025</div>
  </footer>
);
