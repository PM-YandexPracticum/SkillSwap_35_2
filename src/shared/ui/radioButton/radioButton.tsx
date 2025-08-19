import React from 'react';
import styles from './radioButton.module.scss';
import type { IRadioButtonProps } from './radioButtonTypes';

export const RadioButton: React.FC<IRadioButtonProps> = ({
  label,
  value,
  name,
  checked,
  onChange,
  className = ''
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <label className={`${styles.radioWrapper} ${className}`}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className={styles.input}
      />
      <span className={styles.radioCircle} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
