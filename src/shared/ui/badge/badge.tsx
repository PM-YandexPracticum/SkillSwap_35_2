import type { FC } from "react";
import type { TBadgeProps } from "./type";
import styles from './badge.module.scss';
import { badgeCategoryesColors } from "../../lib/constants";

export const BadgeUI: FC<TBadgeProps> = ({ category, title }: TBadgeProps) => {
  const color = badgeCategoryesColors[category];
  
  return (
    <div className={styles.badge} style={{backgroundColor: color}}>
      {title}
    </div>
  )
}