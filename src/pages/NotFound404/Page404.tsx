import { Button } from '../../shared/ui/button/button';
import { useNavigate } from 'react-router-dom';
import styles from './Page404.module.scss';
import image404 from '../../shared/assets/images/error 404.svg';
import { Footer } from '@/shared/ui/footer/Footer';
//import { Header } from '@/shared/ui/footer/Header';

export const NotFound404 = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  const handleReportError = () => {
    console.log('Сообщение об ошибке отправлено');
  };
  return (
	<div className={styles.page}>
			<Footer />
    <div className={styles.container}>
      <img className={styles.image} src={image404} alt='404' />
      <div className={styles.textPage}>
        <h2 className={styles.massageTitle}>Страница не найдена</h2>
        <p className={styles.massageText}>
		К сожалению, эта страница недоступна. 
		Вернитесь на главную страницу или попробуйте позже
        </p>
      </div>
      <div className={styles.buttonList}>
        <Button
          onClick={handleReportError}
          className={`${styles.buttonLeft} ${styles.button}`}
          buttonType='secondary'
          disabled={false}
          text={'Сообщить об ошибке'}
        >
          Сообщить об ошибке
        </Button>
        <Button
          onClick={handleGoToMain}
          className={`${styles.buttonRight} ${styles.button}`}
          buttonType='primary'
          disabled={false}
          text={'На главную'}
        >
          На главную
        </Button>
      </div>
    </div>
	<Footer />
	</div>
	
  );
};
