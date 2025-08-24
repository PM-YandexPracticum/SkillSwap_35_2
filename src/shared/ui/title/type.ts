import type { ElementType } from 'react';

export type THeadingProps = {
  size: 'h1' | 'h2' | 'h3' | 'h4';
  text: string;
};

export type TitleUIProps = {
  headingSize: ElementType;
  text: string;
};
