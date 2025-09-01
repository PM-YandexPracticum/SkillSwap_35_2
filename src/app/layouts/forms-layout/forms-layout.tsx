import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/header/header';
import styles from './forms-layout.module.scss';

export const FormsLayout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.layoutContent}>
      <Outlet /> {/* сюда будут рендериться страницы */}
    </main>
  </div>
);
