import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FormsLayout } from '@/app/layouts/forms-layout/forms-layout';
import { MainLayout } from '@/app/layouts/main-layout/main-layout';
import { Error500 } from '@/pages/Error500';
import { Login } from '@/pages/Login';
import { NotFound404 } from '@/pages/NotFound404';

import { Registration } from '@/pages/Registration';
import { SkillPage } from '@/pages/SkillPage';
import { CardsPage } from '@/pages/СardsPage/CardsPage';
import { ModalUI } from '@/shared/ui';
// import { Profile } from '@/pages/profile';

export const AppRouter = () => {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<CardsPage />} />
          {/*<Route path='profile' element={<Profile />} /> */}
          <Route path='skills/:id' element={<SkillPage />} />
          <Route path='error500' element={<Error500 />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
        <Route element={<FormsLayout />}>
          <Route
            path='login'
            element={
              <ModalUI
                zIndex={10}
                mode='fullscreen'
                onClose={() => navigate(-1)}
              >
                <Login />
              </ModalUI>
            }
          />
          {/**/}
          <Route
            path='register'
            element={
              <ModalUI
                zIndex={10}
                mode='fullscreen'
                onClose={() => navigate(-1)}
              >
                <Registration />
              </ModalUI>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
