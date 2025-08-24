/// <reference types="vite-plugin-svgr/client" />
//import { Logo } from '../Logo';
// src/shared/ui/header/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/shared/ui/input/input';
import ChevronDownIcon from '@icons/chevron-down.svg?react';
import SearchIcon from '@icons/search.svg?react';
import styles from './header.module.scss';

interface HeaderProps {
  user?: string;
  isAuth: boolean;
}
export const Header = ({ user, isAuth }: HeaderProps) => {
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
        {/* <SearchIcon className={styles.searchIcon} aria-hidden='true' /> */}
        <Input
          // className={styles.searchInput}
          type='search'
          placeholder='Искать навык'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<SearchIcon />}
          iconPosition='left'
          inputClassName={styles.searchInput}
          aria-label='Search input'
        />
      </form>

      {/* Действия пользователя */}
      <div className={styles.userActions}>
        <Link to='/login' className={styles.loginLink}>
          Войти
        </Link>
        <Link to='/register' className={styles.registerLink}>
          Регистрация
        </Link>
      </div>
    </header>
  );
};
