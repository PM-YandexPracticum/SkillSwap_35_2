import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import ideaIcon from '../../shared/assets/icons/idea.svg?url';
import likeIcon from '../../shared/assets/icons/like.svg?url';
import messageIcon from '../../shared/assets/icons/message-text.svg?url';
import requestIcon from '../../shared/assets/icons/request.svg?url';
import userIcon from '../../shared/assets/icons/user.svg?url';
import styles from './profile-sidebar.module.scss';

const menuItems = [
  {
    to: '/requests',
    text: 'Заявки',
    logoUrl: requestIcon
  },
  {
    to: '/exchanges',
    text: 'Мои обмены',
    logoUrl: messageIcon
  },
  {
    to: '/favourites',
    text: 'Избранное',
    logoUrl: likeIcon
  },
  {
    to: '/skills',
    text: 'Мои навыки',
    logoUrl: ideaIcon
  },
  {
    to: '/profile',
    text: 'Личные данные',
    logoUrl: userIcon,
    end: true
  }
];

export const ProfileSidebar = () => {
  const location = useLocation();


  return (
    <aside className={styles.profile_sidebar}>
      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            clsx(
              styles.sidebar_nav_item,
              (isActive || location.pathname === item.to) &&
                styles.sidebar_nav_item_active
            )
          }
        >
          <div className={styles.menuItemIcon}>
            <img src={item.logoUrl} alt={`Перейти в ${item.text}`} />
          </div>
          <span className={styles.sidebar_nav_item__title}>{item.text}</span>
        </NavLink>
      ))}
    </aside>
  );
};
