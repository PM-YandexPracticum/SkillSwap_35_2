import { useNavigate } from 'react-router-dom';
//import { Logo } from '../Logo'; //временно отключено
import styles from './Footer.module.scss';

export const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };
  /* <Logo />*/ // вместо рисунка <a>
  /* <Logo />*/ // вместо рисунка <a>
  return (
    <footer className={styles.footer}>
      <a href='/' onClick={handleLogoClick}>
        <img
          src='https://placehold.co/150x50/2563eb/white?text=SkillSwap'
          alt='SkillSwap Logo'
          className={styles.logoImage}
        />
      </a>
      <ul className={styles.footerNavBlock}>
        <li>
          <a href='/about' onClick={handleLinkClick('/about')}>
            О проекте
          </a>
        </li>
        <li>
          <a href='/contacts' onClick={handleLinkClick('/contacts')}>
            Контакты
          </a>
        </li>
        <li>
          <a href='/privacy' onClick={handleLinkClick('/privacy')}>
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a href='/skills' onClick={handleLinkClick('/skills')}>
            Все навыки
          </a>
        </li>
        <li>
          <a href='/blog' onClick={handleLinkClick('/blog')}>
            Блог
          </a>
        </li>
        <li>
          <a href='/agreement' onClick={handleLinkClick('/agreement')}>
            Пользовательское соглашение
          </a>
        </li>
      </ul>
      <p className={styles.footerSignature}>SkillSwap - 2025</p>
    </footer>
  );
};
