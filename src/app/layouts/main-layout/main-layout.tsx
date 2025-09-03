import { Outlet } from 'react-router-dom';
import { Footer } from '@/shared/ui/footer/Footer';
import { Header } from '@widgets/header/header';
import styles from './main-layout.module.scss';

export const MainLayout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.layoutContent}>
      <Outlet /> {/* сюда будут рендериться страницы */}
    </main>
    <Footer />
  </div>
);
