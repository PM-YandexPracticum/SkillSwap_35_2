import { useState } from 'react';
import type { TUserCard } from '@/api/types';
import { formatAge } from '@/shared/lib/format-age';
import { BadgeUI, Button } from '@/shared/ui';
import { LikeButtonUI } from '@/shared/ui/like-button';
import styles from './userCard.module.scss';

interface UserCardProps {
  user: TUserCard;
}

//конвертер формата даты рождения для корректной работы formatAge
const convertBirthDate = (birthDate: string) => {
  const [day, month, year] = birthDate.split('.');
  return `${year}-${month}-${day}`;
};

export const UserCard = ({ user }: UserCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const userAge = formatAge(convertBirthDate(user.birthDate));

  return (
    <article className={styles.userCard}>
      <section className={styles.userData}>
        <img
          className={styles.avatar}
          src={user.profileImage}
          alt={user.name}
        />
        <div>
          <p className={styles.userName}>{user.name}</p>
          <p className={styles.userInfo}>
            {user.location}, {userAge}
          </p>
        </div>
        <LikeButtonUI
          setLiked={setIsLiked}
          liked={isLiked}
          className={styles.likeBtn}
        />
      </section>
      {/* в секции надо сделать динамическое отображение навыков, я пока не понимаю, как... */}
      <section className={styles.skillsSection}>
        <div>
          <p className={styles.skillsTitle}>Может научить:</p>
          <BadgeUI category='Иностранные языки' title='Название' />
        </div>
        <div>
          <p className={styles.skillsTitle}>Хочет научиться:</p>
          <BadgeUI category='Творчество и искусство' title='Название' />
        </div>
      </section>

      <Button buttonType='primary' text='Подробнее' className={styles.button} />
    </article>
  );
};
