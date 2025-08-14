import React from 'react';
import './button.scss'; 
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
}) => {
  return (
    <button
      className={`${buttonType} ${disabled ? 'disabled' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="button__icon">{icon}</span>
      )}
      {text && <span className="button__text">{text}</span>}
      {icon && iconPosition === 'right' && (
        <span className="button__icon">{icon}</span>
      )}
    </button>
  );
};