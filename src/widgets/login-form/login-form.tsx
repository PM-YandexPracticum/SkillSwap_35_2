import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button/button';
import { InputEmail } from '@/shared/ui/input/input';
import { PasswordInput } from '@/shared/ui/input-password';
import styles from './login-form.module.scss';
import type { LoginFormFields, LoginUIProps } from './type';

export const LoginFormUI = ({
  onSubmit,
  errorText,
  buttonText,
  buttonType = 'submit',
  onButtonClick
}: LoginUIProps) => {
  const { register, handleSubmit } = useForm<LoginFormFields>();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputEmail
        placeholder='Введите e-mail'
        label='E-mail'
        className={styles.input}
        inputClassName={errorText ? styles.inputError : ''}
        {...register('email')}
      />

      <PasswordInput
        placeholder='Введите ваш пароль'
        label='Пароль'
        className={styles.input}
        inputClassName={errorText ? styles.inputError : ''}
        {...register('password')}
      />

      {errorText && <p className={styles.error}>{errorText}</p>}

      <div className={styles.buttonContainer}>
        <Button
          buttonType='primary'
          text={buttonText}
          className={styles.button}
          htmlType={buttonType}
          onClick={buttonType === 'button' ? onButtonClick : undefined}
        />
      </div>
    </form>
  );
};
