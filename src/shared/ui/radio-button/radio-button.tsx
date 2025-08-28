import type { IRadioButtonProps } from './radio-button-types';
import styles from './radio-button.module.scss';

export const RadioButton = ({
  label,
  value,
  name,
  checked,
  onChange,
  className = ''
}: IRadioButtonProps) => {
  const handleChange = () => {
    onChange?.(value);
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
