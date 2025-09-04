import Ok from '@/shared/assets/icons/ok.svg';
import { Button } from '@/shared/ui/button';
import { ModalUI } from '@/shared/ui/modal';

import styles from './success-registration-modal.module.scss';
import type { SuccessRegProps } from './type';

export const SuccessRegistration = ({ onClose }: SuccessRegProps) => (
  <ModalUI onClose={onClose} mode='dialog' zIndex={10}>
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <Ok />
      </div>
      <div className={styles.text}>
        <p className={styles.title}>Важе предложение создано</p>
        <p className={styles.descriptiion}>Теперь вы можете предложить обмен</p>
      </div>
      <Button
        className={styles.button}
        buttonType='primary'
        onClick={onClose}
        text='Готово'
      />
    </div>
  </ModalUI>
);
