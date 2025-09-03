import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../shared/ui/footer/Footer.tsx';
import { Header } from '../../widgets/header/header.tsx';
import { ProfileSidebar } from '../../widgets/usersprofile-menu/index.ts';
import styles from './user-page.module.css';

export const UserPage: FC = () => (
  <div className={styles.profile_layout}>
    <Header />
    <main className={styles.page_block}>
      <ProfileSidebar />
      <main className={styles.profile_content}>
        <Outlet />
      </main>
    </main>
    <Footer />
  </div>
);
