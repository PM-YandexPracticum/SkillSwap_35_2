import type { FC } from 'react';
import type { TSkillRequest } from '@/api/types';
import { TitleUI } from '@/shared/ui/title';

export const UserOffer: FC<TSkillRequest> = ({
  skill,
  description,
  images,
  requestStatus
}) => {
  //todo: прописать функцию запроса названия категории по id
  const categoryName = 'Название категории';
  //todo: прописать функцию запроса названия подкатегории по id
  const subcategoryName = 'Название подкатегории';
  const imagesNumber = images.length;

  return (
    <div className=''>
      <div className='' />
      <TitleUI size='H1' text={skill.skillName} />
      <p>
        {categoryName} / {subcategoryName}
      </p>
      <p>{description}</p>
    </div>
  );
};
