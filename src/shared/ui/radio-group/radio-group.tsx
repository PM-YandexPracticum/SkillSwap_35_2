import { RadioButton } from '../radio-button/radio-button';
import type { IRadioGroupProps } from './radio-group-types';
import styles from './radio-group.module.scss';

export const RadioGroup = ({
  options,
  name,
  selectedValue,
  onChange,
  className = '',
  groupTitle
}: IRadioGroupProps) => (
  <div className={`${styles.radioGroup} ${className}`}>
    {groupTitle && <div className={styles.groupTitle}>{groupTitle}</div>}

    {options.map((option) => (
      <RadioButton
        key={option.value}
        name={name}
        label={option.label}
        value={option.value}
        checked={selectedValue === option.value}
        onChange={onChange}
      />
    ))}
  </div>
);
