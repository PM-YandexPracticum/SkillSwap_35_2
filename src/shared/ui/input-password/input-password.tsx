import { useState } from 'react';
import EyeOffIcon from '@/shared/assets/icons/eye-slash.svg';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input/input';
import styles from './input-password.module.scss';
import type { PasswordInputProps } from './type';

export const PasswordInput = ({
  value,
  name,
  onChange,
  placeholder,
  label,
  error,
  className,
  inputClassName,
  ...props
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Input
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        error={error}
        inputClassName={inputClassName}
        type={isVisible ? 'text' : 'password'}
        {...props}
      />
      <Button
        buttonType='iconOnly'
        onClick={() => setIsVisible((prev) => !prev)}
        className={styles.toggleBtn}
        icon={isVisible ? <EyeOffIcon /> : <EyeIcon />}
        aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
      />
    </div>
  );
};
