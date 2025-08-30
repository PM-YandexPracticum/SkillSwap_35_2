import AppleIcon from '@/shared/assets/icons/Apple.svg';
import GoogleIcon from '@/shared/assets/icons/Google.svg';
import { Button } from '@/shared/ui/button';
import styles from './qauth-login-bar.module.scss';

export const QAuthBar = () => (
  <div className={styles.wrapper}>
    <Button
      buttonType='tertiary'
      disabled={false}
      onClick={() => {}}
      text='Продолжить с Google'
      icon={<GoogleIcon />}
      iconPosition='left'
      className={styles.button}
    />
    <Button
      buttonType='tertiary'
      disabled={false}
      onClick={() => {}}
      text='Продолжить с Apple'
      icon={<AppleIcon />}
      iconPosition='left'
      className={styles.button}
    />
  </div>
);
