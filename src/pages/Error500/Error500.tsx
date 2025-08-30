import { useNavigate } from 'react-router-dom';
import error500 from '../../shared/assets/images/error 500.svg?url';
import { Button } from '../../shared/ui/button/button';
import styles from './Error500.module.scss';

export const Error500 = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  const handleReportError = () => {
    console.log('Сообщение об ошибке отправлено');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img className={styles.image} src={error500} alt='500' />
        <div className={styles.textPage}>
          <h2 className={styles.massageTitle}>На сервере произошла ошибка</h2>
          <p className={styles.massageText}>
            Попробуйте позже или вернитесь на главную страницу
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
    </div>
  );
};
