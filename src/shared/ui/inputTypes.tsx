import type { ChangeEvent } from 'react';

export interface inputProps {
  className?: string;
  label?: string; // название поля input сверху
  type?: string; // тип поля (password, email и др)
  placeholder?: string; // подсказка в поле
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
