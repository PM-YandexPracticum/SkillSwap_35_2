import { useState, type FC, type SyntheticEvent } from 'react';
import likeIcon from '../../assets/icons/like.svg';
import likedIcon from '../../assets/icons/likedIcon.svg';
import styles from './likeButton.module.scss';
import type { TLikeButtonProps } from './type';

export const LikeButtonUI: FC<TLikeButtonProps> = ({
  liked,
  setLiked,
  onClick
}: TLikeButtonProps) => {
  const handleClick = (evt: SyntheticEvent) => {
    setLiked((liked) => !liked);
    onClick(evt);
  };
  return (
    <button onClick={handleClick} className={styles.button}>
      {liked ? (
        <img src={likedIcon} alt='Убрать лайк' />
      ) : (
        <img src={likeIcon} alt='Лайкнуть' />
      )}
    </button>
  );
};
