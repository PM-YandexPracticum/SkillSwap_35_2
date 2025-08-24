// import React from 'react';
// import clsx from 'clsx';
// import styles from './input.module.scss';
// import type { inputProps } from './inputTypes';

// export function Input({
//   className,
//   inputClassName,
//   label,
//   type = 'text',
//   placeholder,
//   value,
//   onChange,
//   error
// }: inputProps) {
//   return (
//     <div className={clsx(styles.input, className)}>
//       {label && <label className={styles.label}>{label}</label>}

//       <input
//         className={clsx(
//           styles.field,
//           error && styles.fieldError,
//           inputClassName
//         )}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//       />

//       {error && <span className={styles.error}>{error}</span>}
//     </div>
//   );
// }

//import React from 'react';
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
  iconPosition = 'left'
}: InputProps) {
  const inputPaddingStyle =
    icon && iconPosition === 'left'
      ? { paddingLeft: '44px' }
      : icon && iconPosition === 'right'
        ? { paddingRight: '44px' }
        : undefined;

  const iconStyle =
    iconPosition === 'left' ? { left: '12px' } : { right: '12px' };

  return (
    <div className={clsx(styles.input, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.fieldWrapper}>
        {icon && (
          <span className={styles.icon} style={iconStyle}>
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
          style={inputPaddingStyle}
        />
      </div>

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
