export type TUserOfferProps = {
  className?: string;
  skillName: string;
  categoryName: string;
  subcategoryName: string;
  description: string;
  images: string[];
  requestStatus: string;
  justAdded: boolean; // если true, то скилл только добавлен и надо подтвердить: должны быть кнопки "редактировать" и "готово"
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onShare?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickReady?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
