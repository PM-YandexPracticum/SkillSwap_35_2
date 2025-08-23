import { TitleUI } from '@/shared/ui/title';
import type { TUserOfferProps } from './user-offer-types';

export const UserOfferUI = ({
  skillName,
  categoryName,
  subcategoryName,
  description,
  images,
  requestStatus,
  justAdded,
  isLiked
}: TUserOfferProps) => (
  <div className=''>
    <div className='' />
    <TitleUI size='H1' text={skillName} />
    <p>
      {categoryName} / {subcategoryName}
    </p>
    <p>{description}</p>
  </div>
);
