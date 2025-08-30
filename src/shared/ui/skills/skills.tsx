import { useEffect } from 'react';
import { SKILL_CATEGORIES } from '../../consts/categories';
import styles from './skills.module.scss';
interface ISkillsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Skills = ({ isOpen, onClose }: ISkillsProps) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`${styles.overlay}`)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClick);
    }
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen, onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {Object.values(SKILL_CATEGORIES).map((category) => (
            <div key={category.label} className={styles.category}>
              <div className={styles.iconContainer}>
                <img src={category.icon} alt={category.label} />
              </div>
              <div className={styles.body}>
                <span className={styles.title}>{category.label}</span>
                <ul className={styles.skills}>
                  {category.skills.map((skill) => (
                    <li key={skill} className={styles.skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
