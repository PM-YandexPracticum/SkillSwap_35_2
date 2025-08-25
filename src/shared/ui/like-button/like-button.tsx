import likeIcon from '../../assets/icons/like.svg';
import likedIcon from '../../assets/icons/likedIcon.svg';
import styles from './like-button.module.scss';
import type { TLikeButtonProps } from './type';

export const LikeButtonUI = ({
  liked, // начальное состояние кнопки
  setLiked // функция изменения состояния (например, из useState)
}: TLikeButtonProps) => {
  const handleClick = () => {
    setLiked((liked) => !liked);
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
