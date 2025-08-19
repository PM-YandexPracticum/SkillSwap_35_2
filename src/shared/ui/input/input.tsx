// import React from 'react';
import clsx from 'clsx';
import styles from './input.module.scss';
import type { inputProps } from './inputTypes';

export function Input({
  className,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error
}: inputProps) {
  return (
    <div className={clsx(styles.input, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={clsx(styles.field, error && styles.fieldError)}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export const InputText = (props: inputProps) => (
  <Input {...props} type='text' />
);
export const InputEmail = (props: inputProps) => (
  <Input {...props} type='email' />
);
export const InputPassword = (props: inputProps) => (
  <Input {...props} type='password' />
);
