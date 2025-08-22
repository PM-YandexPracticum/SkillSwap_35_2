/// <reference types="vite-plugin-svgr/client" />
//import { Logo } from '../Logo';
// src/shared/ui/header/Header.tsx
import { Link } from 'react-router-dom';
import ChevronDownIcon from '@icons/chevron-down.svg?react';
import styles from './header.module.scss';
import SearchIcon from './search.svg?react';

export const Header = () => (
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
          <Link to='/about' className={styles.navLink}>
            О проекте
            <ChevronDownIcon className={styles.chevronIcon} />
          </Link>
        </li>
        <li>
          <Link to='/skills' className={styles.navLink}>
            Все навыки
          </Link>
        </li>
      </ul>
    </nav>

    {/* Поиск */}
    <form className={styles.searchForm} role='search' aria-label='Search'>
      <div className={styles.search}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type='search'
          name='q'
          placeholder='Искать навык'
          className={styles.searchInput}
          aria-label='Search input'
        />
      </div>
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
