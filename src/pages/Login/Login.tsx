import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { LoginFeature } from '@/features/login';
import loginImg from '@/shared/assets/images/light-bulb.svg?url';
import { Header } from '@/widgets/header';
import { QAuthBar } from '@/widgets/qauth-login-bar';
import { RegistrationUI } from '@/widgets/registrationUi';
import styles from './login.module.scss';

export const Login = () => {
  // хук для редиректа
  // тут же используем useLocation, если надо вернуться на определенную страницу
  const navigate = useNavigate();

  return (
    <>
      {/* <Header isFormOpen /> */}

      <div className={styles.statusbar}>
        <p className={styles.heading}>Вход</p>
      </div>

      <RegistrationUI
        imageSrc={loginImg}
        title='С возвращением в SkillSwap!'
        description='Обменивайтесь знаниями и навыками с другими людьми'
      >
        <div className={styles.wrapper}>
          <QAuthBar />
          <div className={styles.separator}>
            <p className={styles.text}>или</p>
          </div>
          <LoginFeature onSuccess={() => navigate(-1)} />
        </div>
        <div className={styles.registration}>
          <Link to='/register' className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
      </RegistrationUI>
    </>
  );
};
