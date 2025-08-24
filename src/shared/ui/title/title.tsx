import styles from './title.module.scss';
import type { THeadingProps, TitleUIProps } from './type';

const Heading = ({ headingSize: Tag = 'h1', text }: TitleUIProps) => (
  <Tag className={`${styles.title} ${styles['title_' + String(Tag)]}`}>
    {text}
  </Tag>
);

export const TitleUI = ({ size, text }: THeadingProps) => (
  <Heading headingSize={size} text={text} />
);
