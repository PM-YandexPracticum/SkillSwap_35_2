import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/header';
import styles from './forms-layout.module.scss';

export const FormsLayout = () => (
  <div className={styles.layout}>
    <Header isFormOpen />
    <main className={styles.layoutContent}>
      <Outlet />
    </main>
  </div>
);
