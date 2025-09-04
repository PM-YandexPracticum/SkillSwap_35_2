import { useEffect, useMemo, useState } from 'react';
import type { TSkill } from '@/api/types';
import {
  categoriesList,
  getCategoriesThunk
} from '@/entities/categories/categories-slice';
import { formatAge } from '@/shared/lib/format-age';
import { BadgeUI, Button } from '@/shared/ui';
import { LikeButtonUI } from '@/shared/ui/like-button';
import { useDispatch, useSelector } from '../../app/store/store';
import styles from './userCard.module.scss';

interface UserCardProps {
  skill: TSkill;
  variant: 'compact' | 'detailed';
}

//конвертер формата даты рождения для корректной работы formatAge
const convertBirthDate = (birthDate: string) => {
  const [year, month, day] = birthDate.split('.');
  return `${year}-${month}-${day}`;
};

export const UserCard = ({ skill, variant }: UserCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const categoriesData = useSelector(categoriesList);
  const dispatch = useDispatch();
  const userAge = formatAge(convertBirthDate(skill.skillOwner.birthDate));
  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);
  const categoryMap = useMemo(() => {
    const map = new Map<number, string>();
    categoriesData.forEach((cat) => {
      map.set(cat.categoryId, cat.title);
    });
    return map;
  }, [categoriesData]);

  const subcategoryMap = useMemo(() => {
    const map = new Map<number, { title: string; categoryId: number }>();
    categoriesData.forEach((cat) => {
      cat.subcategories.forEach((sub) => {
        map.set(sub.subcategoryId, {
          title: sub.title,
          categoryId: cat.categoryId
        });
      });
    });
    return map;
  }, [categoriesData]);

  const getCategoryForSubcategory = (subcategoryId: number): string => {
    const subcategoryInfo = subcategoryMap.get(subcategoryId);
    if (!subcategoryInfo) return 'Неизвестная категория';

    return (
      categoryMap.get(subcategoryInfo.categoryId) || 'Неизвестная категория'
    );
  };

  return (
    <article className={styles.userCard} data-variant={variant}>
      <section className={styles.userData}>
        <img
          className={styles.avatar}
          src={skill.skillOwner.profileImage}
          alt={skill.skillOwner.name}
        />
        <div>
          <p className={styles.userName}>{skill.skillOwner.name}</p>
          <p className={styles.userInfo}>
            {skill.skillOwner.location}, {userAge}
          </p>
        </div>

        {variant === 'compact' && (
          <LikeButtonUI
            setLiked={setIsLiked}
            liked={isLiked}
            className={styles.likeBtn}
          />
        )}
      </section>

      {variant === 'detailed' && (
        <div>
          <p className=''>{skill.skillOwner.bio}</p>
        </div>
      )}

      {/* в секции надо сделать динамическое отображение навыков, я пока не понимаю, как... */}
      <section className={styles.skillsSection}>
        <div>
          <p className={styles.skillsTitle}>Может научить:</p>
          <BadgeUI
            category={
              categoryMap.get(skill.canTeach.categoryId) ||
              'Неизвестная категория'
            }
            title={skill.canTeach.skillName}
          />
        </div>
        <div>
          <p className={styles.skillsTitle}>Хочет научиться:</p>
          {skill.wantToLearn.map((subcategory) => (
            <BadgeUI
              key={subcategory.subcategoryId}
              category={getCategoryForSubcategory(subcategory.subcategoryId)}
              title={subcategory.title}
            />
          ))}
        </div>
      </section>
      {variant === 'compact' && (
        <Button
          buttonType='primary'
          text='Подробнее'
          className={styles.button}
        />
      )}
    </article>
  );
};
