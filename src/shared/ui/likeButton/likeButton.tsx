import { useState, type FC, type SyntheticEvent } from 'react';
import likeIcon from '../../assets/icons/like.svg';
import likedIcon from '../../assets/icons/likedIcon.svg';
import styles from './likeButton.module.scss';
import type { TLikeButtonProps } from './type';

export const LikeButtonUI: FC<TLikeButtonProps> = ({
  liked,
  onClick
}: TLikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const handleClick = (evt: SyntheticEvent) => {
    setIsLiked((isLiked) => !isLiked);
    onClick(evt);
  };
  return (
    <button onClick={handleClick} className={styles.button}>
      {isLiked ? (
        <img src={likedIcon} alt='Убрать лайк' />
      ) : (
        <img src={likeIcon} alt='Лайкнуть' />
      )}
    </button>
  );
};
