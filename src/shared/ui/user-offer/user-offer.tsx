import { useState, type SyntheticEvent } from 'react';
import MoreOptions from '@/shared/assets/icons/more-square.svg';
import ShareIcon from '@/shared/assets/icons/share.svg';
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
  className,
  skillName,
  categoryName,
  subcategoryName,
  description,
  images,
  requestStatus,
  justAdded,
  isLiked,
  setIsLiked,
  onShare,
  onClick,
  onClickReady = () => {}
}: TUserOfferProps) => {
  // внутреннее состояние в котором сохраняется порядок картинок. Нужно чтобы они перелистывались
  const [imagesList, setImagesList] = useState(images);

  // обработчик нажатия на левую кнопку-стрелку
  const handleGaleryLeftButton = (_e: SyntheticEvent) => {
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

  // обработчик нажатия на правую кнопку-стрелку
  const handleGaleryRightButton = (_e: SyntheticEvent) => {
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
    <div className={`${styles.card} ${className}`}>
      {/*блок кнопок лайка, поделиться и т.п.*/}
      <div className={styles.cardActions}>
        <LikeButtonUI liked={isLiked} setLiked={setIsLiked} className='' />
        <Button buttonType='iconOnly' icon={<ShareIcon />} onClick={onShare} />
        <MoreOptions />
      </div>
      {/*Левая сторона карточки с текстом и кнопками*/}
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
          ) : requestStatus === 'sended' ? (
            // если обмен отправлен, то показываем кнопку
            // с соответствующим текстом и иконкой
            <Button
              buttonType='secondary'
              text='Обмен предложен'
              icon={<ClockIcon />}
              iconPosition='left'
              onClick={onClick}
              className={styles.cardButtonBig}
            />
          ) : requestStatus === 'rejected' ? (
            // если обмен отменен, то показываем кнопку
            // с соответствующим текстом и иконкой
            <Button
              buttonType='secondary'
              text='Запрос отклонен'
              onClick={onClick}
              className={styles.cardButtonBig}
            />
          ) : requestStatus === 'approved' ? (
            // если обмен принят, то показываем кнопку
            // с соответствующим текстом и иконкой
            <Button
              buttonType='secondary'
              text='Запрос принят'
              onClick={onClick}
              className={styles.cardButtonBig}
            />
          ) : (
            // отображается если requestStatus === 'none'
            <Button
              text='Предложить обмен'
              onClick={onClick}
              className={styles.cardButtonBig}
            />
          )}
        </div>
      </div>
      <CardGalery
        skillName={skillName}
        images={imagesList}
        handleGaleryLeftButton={handleGaleryLeftButton}
        handleGaleryRightButton={handleGaleryRightButton}
      />
    </div>
  );
};
