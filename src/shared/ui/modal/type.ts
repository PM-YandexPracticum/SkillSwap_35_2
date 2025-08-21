import type { ReactNode } from 'react';

export type TModalUIProps = {
  title?: string;
  description?: string;
  onClose: () => void;
  children?: ReactNode;
};
