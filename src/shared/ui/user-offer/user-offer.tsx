import { useState, type SyntheticEvent } from 'react';
import { TitleUI } from '@/shared/ui/title';
import ChevronRight from '../../assets/icons/chevron-right.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { Button } from '../button/button';
import { LikeButtonUI } from '../like-button';
import type { TUserOfferProps } from './user-offer-types';
import styles from './user-offer.module.scss';

type TCardGaleryProps = {
  skillName: string;
  images: string[];
  handleGaleryLeftButton: (e: SyntheticEvent) => void;
  handleGaleryRightButton: (e: SyntheticEvent) => void;
};

const CardGalery = ({
  skillName,
  images,
  handleGaleryLeftButton,
  handleGaleryRightButton
}: TCardGaleryProps) => (
  <div className={styles.cardGalery}>
    {images.map(
      (img, index) =>
        index < 4 && (
          <div className={styles.cardImgWrapper} key={index}>
            {index === 0 && (
              <>
                <button
                  className={`${styles.galeryButton} ${styles.galeryButtonLeft}`}
                  onClick={handleGaleryLeftButton}
                >
                  <ChevronRight />
                </button>
                <button
                  className={styles.galeryButton}
                  onClick={handleGaleryRightButton}
                >
                  <ChevronRight />
                </button>
              </>
            )}
            <img
              src={img}
              className={styles.cardImg}
              alt={`Изображения для ${skillName}`}
            />
            {images.length > 4 && index === 3 && (
              <div className={styles.cardLastImgCover}>
                {`+${images.length - 3}`}
              </div>
            )}
          </div>
        )
    )}
  </div>
);

export const UserOfferUI = ({
  skillName,
  categoryName,
  subcategoryName,
  description,
  images,
  requestStatus,
  justAdded,
  isLiked,
  setIsLiked,
  onClick,
  onClickReady = () => {}
}: TUserOfferProps) => {
  const [imagesList, setImagesList] = useState(images);

  const handleGaleryLeftButton = (e: SyntheticEvent) => {
    let arr = [...imagesList];
    // Сохраняем последний элемент
    let lastElement = arr[arr.length - 1];
    // Удаляем последний элемент
    arr.splice(arr.length - 1, 1);
    // Добавляем сохраненный элемент в начало
    arr.unshift(lastElement);
    setImagesList(arr);
    console.log(imagesList);
  };

  const handleGaleryRightButton = (e: SyntheticEvent) => {
    let arr = [...imagesList];
    // Сохраняем первый элемент
    let firstElement = arr[0];
    // Удаляем первый элемент
    arr.splice(0, 1);
    // Добавляем сохраненный элемент в конец
    arr.push(firstElement);
    setImagesList(arr);
    console.log(imagesList);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardActions}>
        <LikeButtonUI liked={isLiked} setLiked={setIsLiked} />
      </div>
      <div className={styles.cardMain}>
        <TitleUI size='h1' text={skillName} />
        <p className={styles.cardCategory}>
          {categoryName} / {subcategoryName}
        </p>
        <p className={styles.cardText}>{description}</p>
        <div className={styles.cardButtons}>
          {justAdded ? ( // если только добавлено, то показываем возможность редактировать
            <>
              <Button
                buttonType='secondary'
                text='Редактировать'
                icon={<EditIcon />}
                iconPosition='right'
                onClick={onClick}
                className={styles.cardButtonSmall}
              />
              <Button
                buttonType='primary'
                text='Готово'
                onClick={onClickReady}
                className={styles.cardButtonSmall}
              />
            </>
          ) : requestStatus === 'sended' ? ( // если обмен отправлен, то показываем кнопку с соответствующим текстом и иконкой
            <Button
              buttonType='secondary'
              text='Обмен предложен'
              icon={<ClockIcon />}
              iconPosition='left'
              onClick={onClick}
              className={styles.cardButtonBig}
            />
          ) : requestStatus === 'rejected' ? (
            <Button
              buttonType='secondary'
              text='Запрос отклонен'
              onClick={onClick}
              className={styles.cardButtonBig}
            />
          ) : requestStatus === 'approved' ? (
            <Button
              buttonType='secondary'
              text='Запрос принят'
              onClick={onClick}
              className={styles.cardButtonBig}
            />
          ) : (
            <Button
              text='Предложить обмен'
              onClick={onClick}
              className={styles.cardButtonBig}
            />
          )}
        </div>
      </div>
      <CardGalery
        images={imagesList}
        handleGaleryLeftButton={handleGaleryLeftButton}
        handleGaleryRightButton={handleGaleryRightButton}
      />
    </div>
  );
};
