import React from 'react';

type TButtonType = 'primary' | 'secondary' | 'tertiary' | 'iconOnly';
type TIconPosition = 'left' | 'right' | 'none';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: TButtonType;
  htmlType?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: TIconPosition;
  className?: string;
}
