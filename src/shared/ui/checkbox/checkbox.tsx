import styles from './checkbox.module.scss';

export interface CheckboxProps {
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'category' | 'subcategory';
}

export const Checkbox = ({
  label,
  name,
  value,
  checked,
  onChange,
  variant = 'category'
}: CheckboxProps) => (
  <div className={styles.checkbox}>
    <label className={styles.checkboxLabel}>
      <input
        className={styles.checkboxInput}
        type='checkbox'
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        data-variant={variant}
      />
      <span className={styles.checkmark} />
      {label}
    </label>
  </div>
);
