import UserProfile from '@/shared/assets/icons/user-profile.svg';
import { Button } from '@/shared/ui/button';
import { ModalUI } from '@/shared/ui/modal';

import styles from './need-auth.module.scss';
import type { NeedAuthProps } from './type';

export const NeedAuth = ({ onClose }: NeedAuthProps) => (
  <ModalUI onClose={onClose} mode='dialog' zIndex={10}>
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <UserProfile />
      </div>
      <div className={styles.text}>
        <p className={styles.title}>
          Войдите или зарегистрируйтесь, чтобы отправить предложение
        </p>
        <p className={styles.descriptiion}>
          Возможность отправлять обмены доступна после входа — создайте профиль
          или авторизуйтесь, чтобы обмениваться навыками с другими
          пользователями.
        </p>
      </div>
      <Button
        className={styles.button}
        buttonType='primary'
        onClick={onClose}
        text='Войти'
      />
    </div>
  </ModalUI>
);
