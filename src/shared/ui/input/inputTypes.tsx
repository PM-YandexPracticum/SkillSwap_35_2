import type { ChangeEvent } from 'react';

export interface InputProps {
  className?: string;
  inputClassName?: string; // дополнительный класс для тега input
  label?: string; // название поля input сверху
  type?: string; // тип поля (password, email и др)
  placeholder?: string; // подсказка в поле
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
// добавлены свойства icon и iconPosition для иконки внутри input
