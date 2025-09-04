import { badgeCategoryesColors } from '../../lib/constants';
import styles from './badge.module.scss';
import type { TBadgeProps } from './type';

export const BadgeUI = ({ category, title }: TBadgeProps) => {
  const color = badgeCategoryesColors[category];

  return (
    <div className={styles.badge} style={{ backgroundColor: color }}>
      {title}
    </div>
  );
};
