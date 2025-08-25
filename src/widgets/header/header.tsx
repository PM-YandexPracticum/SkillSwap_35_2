/// <reference types="vite-plugin-svgr/client" />
//import { Logo } from '../Logo';
// src/shared/ui/header/Header.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/input/input';
import ChevronDownIcon from '@icons/chevron-down.svg?react';
import SearchIcon from '@icons/search.svg?react';
import styles from './header.module.scss';

interface IHeaderProps {
  user?: string;
  isAuth?: boolean;
}
export const Header = ({ user, isAuth }: IHeaderProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  return (
    <header className={styles.header}>
      {/* Логотип */}
      <Link to='/' className={styles.logoLink}>
        <img
          src='https://placehold.co/150x50/2563eb/white?text=SkillSwap'
          alt='SkillSwap Logo'
          className={styles.logoImage}
        />
      </Link>

      {/* Навигация */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link to='/' className={styles.navLink}>
              О проекте
            </Link>
          </li>
          <li>
            <Link to='/skills' className={styles.navLink}>
              Все навыки
              <ChevronDownIcon className={styles.chevronIcon} />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Поиск */}
      <form className={styles.searchForm} role='search' aria-label='Search'>
        <Input
          type='search'
          placeholder='Искать навык'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<SearchIcon />}
          iconStyleOverride={{ left: '12px' }}
          inputPadding={{ paddingLeft: '44px' }}
          inputClassName={styles.searchInput}
          aria-label='Search input'
        />
      </form>

      {/* Действия пользователя */}
      <div className={styles.userActions}>
        <button
          className={styles.loginButton}
          onClick={() => navigate('/login')}
        >
          Войти
        </button>
        <button
          className={styles.registerButton}
          onClick={() => navigate('/register')}
        >
          Регистрация
        </button>
      </div>
    </header>
  );
};
