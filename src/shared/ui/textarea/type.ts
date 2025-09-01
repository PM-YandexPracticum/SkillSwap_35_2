import type { ChangeEventHandler, CSSProperties, ReactNode } from 'react';

export interface ITextareaProps {
  className?: string;
  textareaClassName?: string; // дополнительный класс для тега textarea
  label?: string; // название поля textarea сверху
  placeholder?: string; // подсказка в поле
  value?: string;
  name?: string;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
  icon?: ReactNode; // иконка внутри textarea слева или справа
  iconStyleOverride?: CSSProperties; // позиционирование иконки iconStyleOverride={{ right: '20px' }}
  textareaPadding?: CSSProperties; // отступы для textarea, чтобы текст не налезал на иконку textareaPadding={{ paddingRight: '54px' }
}
