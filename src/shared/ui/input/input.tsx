import clsx from 'clsx';
import styles from './input.module.scss';
import type { InputProps } from './inputTypes';

export function Input({
  className,
  inputClassName,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  iconStyleOverride,
  inputPadding
}: InputProps) {
  return (
    <div className={clsx(styles.input, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.fieldWrapper}>
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
          onChange={onChange}
          style={icon ? inputPadding : undefined}
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export const InputText = (props: InputProps) => (
  <Input {...props} type='text' />
);
export const InputEmail = (props: InputProps) => (
  <Input {...props} type='email' />
);
export const InputPassword = (props: InputProps) => (
  <Input {...props} type='password' />
);
