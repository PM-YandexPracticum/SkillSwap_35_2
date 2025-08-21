import React from 'react';
import { RadioButton } from '../radioButton/radioButton';
import styles from './radioGroup.module.scss';
import type { IRadioGroupProps } from './radioGroupTypes';

export const RadioGroup: React.FC<IRadioGroupProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  className = '',
  groupTitle
}) => (
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
