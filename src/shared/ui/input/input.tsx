import clsx from 'clsx';
import { forwardRef, type ForwardedRef } from 'react';
import styles from './input.module.scss';
import type { IInputProps } from './type';

export function InputBase(
  {
    className,
    inputClassName,
    label,
    type = 'text',
    placeholder,
    value,
    name,
    onChange,
    onClick,
    error,
    icon,
    iconStyleOverride,
    inputPadding
  }: IInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={clsx(styles.input, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={styles.fieldWrapper}
        role='button'
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick?.(e);
        }}
      >
        {icon && (
          <span className={styles.icon} style={iconStyleOverride}>
            {icon}
          </span>
        )}
        <input
          className={clsx(
            styles.field,
            error && styles.fieldError,
            inputClassName
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          style={icon ? inputPadding : undefined}
          ref={ref}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

// Импорт предыдущего инпута, чтобы заработали все следующие экспорты
export const Input = forwardRef<HTMLInputElement, IInputProps>(InputBase);
Input.displayName = 'Input';

export const InputText = forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => <Input {...props} ref={ref} type='text' />
);
InputText.displayName = 'InputText';

export const InputEmail = forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => <Input {...props} ref={ref} type='email' />
);
InputEmail.displayName = 'InputEmail';

export const InputPassword = forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => <Input {...props} ref={ref} type='password' />
);
InputPassword.displayName = 'InputPassword';
