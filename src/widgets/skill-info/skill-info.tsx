import type { TSkill, TCompactSkill } from '@/api/types';
import { useSelector } from '@/app/store/store';
import { categoriesList } from '@/entities/categories/categories-slice';
import { getCardsByCategory } from '@/entities/skills/skills-slice';
import { pickCategory } from '@/shared/lib/pick-categories';
import { TitleUI } from '@/shared/ui/title';
import { UserOfferUI } from '@/shared/ui/user-offer/user-offer';
import { UserCard } from '@/widgets/userCard';
import styles from './skill-info.module.scss';

type SkillInfoProps = {
  skill: TSkill;
  makeOffer: () => void;
  setLike: () => void;
  setShare: (e: React.MouseEvent) => void;
};

export const SkillInfo = ({
  skill,
  makeOffer,
  setLike,
  setShare
}: SkillInfoProps) => {
  const categories = useSelector(categoriesList);

  const categoriesData = pickCategory(
    categories,
    skill?.canTeach.categoryId,
    skill?.canTeach.subcategoryId
  );
  const recommendedSkills = useSelector(
    getCardsByCategory(skill.canTeach.categoryId)
  );

  return (
    <>
      <section className={styles.skillPage}>
        <div className={styles.skillWrapper}>
          <UserCard variant='detailed' skill={skill} />
          <UserOfferUI
            className={styles.skillCard}
            skillName={skill.canTeach.skillName}
            categoryName={categoriesData!.categoryTitle}
            subcategoryName={categoriesData!.subcategoryTitle}
            description={skill.description}
            images={skill.images}
            requestStatus='none'
            justAdded={false}
            isLiked={skill.favorite.likeStatus}
            setIsLiked={setLike} // поставить лайк
            onClick={makeOffer} // предложение обмена
            onShare={setShare} // скопировать ссылку в буфер обмена
          />
        </div>

        <div className={styles.relatedWrapper}>
          <TitleUI size='h2' text='Похожие предложения' />
          <div className={styles.relatedCards}>
            {(recommendedSkills as TCompactSkill[])
              .slice(0, 4)
              .map((relatedSkill) => (
                <UserCard
                  key={relatedSkill.skillId}
                  skill={{ ...relatedSkill, description: '', images: [] }}
                  variant='compact'
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
