import React from 'react';
import styles from './button.module.scss';
import type { ButtonProps } from './buttonTypes';

export const Button: React.FC<ButtonProps> = ({
  buttonType = 'primary',
  disabled = false,
  onClick,
  text,
  icon,
  iconPosition = 'none',
  className = '',
  ...props
}) => (
  <button
    className={`${styles[buttonType]} ${disabled ? styles.disabled : ''} ${className}`}
    disabled={disabled}
    onClick={onClick}
    aria-disabled={disabled}
    {...props}
  >
    {icon && iconPosition === 'left' && (
      <span className={styles.buttonIcon}>{icon}</span>
    )}
    {text && <span className={styles.buttonText}>{text}</span>}
    {icon && iconPosition === 'right' && (
      <span className={styles.buttonIcon}>{icon}</span>
    )}
  </button>
);
