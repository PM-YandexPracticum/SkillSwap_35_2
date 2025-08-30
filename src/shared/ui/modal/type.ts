import type { ReactNode } from 'react';

export type TModalUIProps = {
  title?: string; // заголовок
  description?: string; // описание
  onClose: () => void; // дейтвие при клике
  mode: 'dialog' | 'fullscreen'; // фулскрил или диалоговое окно
  zIndex: number; // для отображения модалок поверх модалок
  children?: ReactNode; // внутренний контент
};
