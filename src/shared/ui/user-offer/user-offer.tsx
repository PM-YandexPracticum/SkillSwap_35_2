import { TitleUI } from '@/shared/ui/title';
import ClockIcon from '../../assets/icons/clock.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { Button } from '../button/button';
import { LikeButtonUI } from '../like-button';
import type { TUserOfferProps } from './user-offer-types';
import styles from './user-offer.module.scss';

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
}: TUserOfferProps) => (
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
    <div className={styles.cardGalery}>
      {images.map((img, index) => (
        <div className={styles.cardImgWrapper} key={index}>
          <img
            src={img}
            className={styles.cardImg}
            alt={`Изображения для ${skillName}`}
          />
        </div>
      ))}
    </div>
  </div>
);
