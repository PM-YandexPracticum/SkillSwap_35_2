import clsx from 'clsx';
import { forwardRef, type ForwardedRef } from 'react';
import styles from './textarea.module.scss';
import type { ITextareaProps } from './type';

export function TextareaBase(
  {
    className,
    textareaClassName,
    label,
    placeholder,
    value,
    name,
    onChange,
    error,
    icon,
    iconStyleOverride,
    textareaPadding,
    rows = 4
  }: ITextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div className={clsx(styles.textarea, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.fieldWrapper}>
        {icon && (
          <span className={styles.icon} style={iconStyleOverride}>
            {icon}
          </span>
        )}
        <textarea
          className={clsx(
            styles.field,
            error && styles.fieldError,
            textareaClassName
          )}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          style={icon ? textareaPadding : undefined}
          ref={ref}
          rows={rows}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  TextareaBase
);
Textarea.displayName = 'Textarea';
