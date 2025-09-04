import bulbImg from '@/shared/assets/images/light-bulb.svg?url';
import { QAuthBar } from '@/widgets/qauth-login-bar';
import { RegistrationLoginUI } from '@/widgets/registration-login-form';
import { RegistrationUI } from '@/widgets/registrationUi';
import styles from './registration-login.module.scss';
import type { RegistrationLoginProps } from './type';

export const RegistrationLogin = ({
  onNextClick,
  defaultValues
}: RegistrationLoginProps) => (
  <RegistrationUI
    imageSrc={bulbImg}
    title='Добро пожаловать в SkillSwap!'
    description='Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
  >
    <div className={styles.wrapper}>
      <QAuthBar />
      <div className={styles.separator}>
        <p className={styles.text}>или</p>
      </div>
      <RegistrationLoginUI
        onButtonClick={onNextClick}
        defaultValues={defaultValues}
      />
    </div>
  </RegistrationUI>
);
