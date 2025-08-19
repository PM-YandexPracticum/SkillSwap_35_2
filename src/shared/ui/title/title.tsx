import React from 'react';
import styles from './title.module.scss';
import type { TitleUIProps } from './type';

export const TitleUI: React.FC<TitleUIProps> = ({
  size,
  text
}: TitleUIProps) => {
  if (size === 'H1')
    return <h1 className={`${styles.title} ${styles.title_h1}`}>{text}</h1>;
  if (size === 'H2')
    return <h2 className={`${styles.title} ${styles.title_h2}`}>{text}</h2>;
  if (size === 'H3')
    return <h3 className={`${styles.title} ${styles.title_h3}`}>{text}</h3>;
  if (size === 'H4') return <h3 className={`${styles.title_h4}`}>{text}</h3>;
};
