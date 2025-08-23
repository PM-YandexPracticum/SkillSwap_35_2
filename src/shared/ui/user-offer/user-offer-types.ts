import type { TSkill } from '@/api/types';

export type TUserOfferProps = {
  skillName: string;
  categoryName: string;
  subcategoryName: string;
  description: string;
  images: string[];
  requestStatus: string;
  justAdded: boolean; // если true, то скилл только добавлен и надо подтвердить: должны быть кнопки "редактировать" и "готово"
  isLiked: boolean;
};
