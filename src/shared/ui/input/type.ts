import type { ChangeEvent } from 'react';

export interface IInputProps {
  className?: string;
  inputClassName?: string; // дополнительный класс для тега input
  label?: string; // название поля input сверху
  type?: string; // тип поля (password, email и др)
  placeholder?: string; // подсказка в поле
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode; // иконка внутри input слева или справа
  iconStyleOverride?: React.CSSProperties; // позиционирование иконки iconStyleOverride={{ left: '12px' }}
  inputPadding?: React.CSSProperties; // отступы для input, чтобы текст не налезал на иконку inputPadding={{ paddingLeft: '44px' }
}
