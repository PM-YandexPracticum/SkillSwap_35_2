/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/shared/assets/images/logo.svg';
import { Button } from '@/shared/ui/button/button';
import { Input } from '@/shared/ui/input/input';
import ChevronDownIcon from '@icons/chevron-down.svg';
import CrossIcon from '@icons/cross.svg';
import LikeFilledIcon from '@icons/like-filled.svg';
import LikeIcon from '@icons/like.svg';
import MoonIcon from '@icons/moon.svg';
import NotificationIcon from '@icons/notification.svg';
import SearchIcon from '@icons/search.svg';
import styles from './header.module.scss';
import UserAvatar from './User-photo.png';

interface IHeaderProps {
  isAuth?: boolean;
  isFormOpen?: boolean;
  isFiltered?: boolean;
  hasNewNotifications?: boolean;
  isFavorites?: boolean;
}

export const Header = ({
  isAuth,
  isFormOpen,
  isFiltered,
  hasNewNotifications,
  isFavorites: isFavoritesProp
}: IHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFavorites = isFavoritesProp ?? location.pathname === '/favorites';
  const [search, setSearch] = useState('');

  return isFormOpen ? (
    <header className={styles.headerWithFormOpen}>
      {/* Логотип */}
      <Link
        to='/'
        className={styles.logoLink}
        aria-label='SkillSwap: перейти на главную'
      >
        <img src={Logo} alt='SkillSwap Logo' className={styles.logoImage} />
      </Link>

      {/* Закрыть форму */}
      <Button
        buttonType='tertiary'
        text='Закрыть'
        icon={<CrossIcon />}
        iconPosition='right'
        className={styles.closeButton}
        aria-label='Закрыть форму'
        onClick={() => navigate(-1)}
      />
    </header>
  ) : (
    <header className={styles.header}>
      {/* Логотип */}
      <Link
        to='/'
        className={styles.logoLink}
        aria-label='SkillSwap: перейти на главную'
      >
        <img src={Logo} alt='SkillSwap Logo' className={styles.logoImage} />
      </Link>

      {/* Навигация */}
      <nav className={styles.nav} aria-label='Основное меню'>
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
      {!isFiltered && (
        <form
          className={styles.searchForm}
          role='search'
          aria-label='Поиск навыка'
        >
          <Input
            type='search'
            placeholder='Искать навык'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<SearchIcon />}
            iconStyleOverride={{ left: '12px' }}
            inputPadding={{ paddingLeft: '44px' }}
            inputClassName={styles.searchInput}
            aria-label='Поле поиска навыка'
          />
        </form>
      )}

      {/* Действия пользователя */}
      {!isAuth ? (
        <div className={styles.userNotAuth}>
          <Button
            buttonType='tertiary'
            icon={<MoonIcon />}
            iconPosition='left'
            className={styles.actionIcons}
            aria-label='Сменить тему'
            onClick={() => console.log('смена темы')}
          />
          <div className={styles.userActions}>
            <Button
              buttonType='secondary'
              text='Войти'
              className={styles.loginButton}
              aria-label='Войти'
              onClick={() => navigate('/login')}
            />
            <Button
              buttonType='primary'
              text='Зарегистрироваться'
              className={styles.registerButton}
              aria-label='Зарегистрироваться'
              onClick={() => navigate('/register')}
            />
          </div>
        </div>
      ) : (
        <div className={styles.userBar}>
          <div className={styles.userIcons}>
            {/* Смена темы */}
            <Button
              buttonType='tertiary'
              icon={<MoonIcon />}
              iconPosition='left'
              className={styles.actionIcons}
              aria-label='Сменить тему'
              onClick={() => console.log('смена темы')}
            />

            {/* Уведомления */}
            <Button
              buttonType='tertiary'
              icon={
                <div className={styles.notificationWrapper}>
                  <NotificationIcon />
                  {hasNewNotifications && (
                    <span
                      className={styles.notificationDot}
                      aria-label='Новое уведомление'
                    />
                  )}
                </div>
              }
              iconPosition='left'
              className={styles.actionIcons}
              onClick={() => console.log('показать уведомления')}
            />

            {/* Избранное */}
            <Button
              buttonType='tertiary'
              icon={isFavorites ? <LikeFilledIcon /> : <LikeIcon />}
              iconPosition='left'
              className={styles.actionIcons}
              onClick={() => navigate('/favorites')}
            />
          </div>

          {/* Информация о пользователе */}
          <div className={styles.userInfo}>
            <p>Имя пользователя</p>
            <Link to='/profile' aria-label='Профиль пользователя'>
              <img
                src={UserAvatar}
                alt='Аватар пользователя'
                className={styles.userAvatar}
              />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
