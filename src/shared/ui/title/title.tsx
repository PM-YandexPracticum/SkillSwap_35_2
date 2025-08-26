import styles from './title.module.scss';
import type { THeadingProps, TitleUIProps } from './type';

const Heading = ({
  headingSize: Tag = 'h1',
  text,
  className
}: TitleUIProps) => (
  <Tag
    className={`${styles.title} ${styles['title_' + String(Tag)]} ${className}`}
  >
    {text}
  </Tag>
);

export const TitleUI = ({ size, text, className }: THeadingProps) => (
  <Heading headingSize={size} text={text} className={className} />
);
