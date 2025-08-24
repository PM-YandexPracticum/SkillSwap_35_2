import { TitleUI } from '@/shared/ui/title';
import clockIcon from '../../assets/icons/clock.svg';
import editIcon from '../../assets/icons/edit.svg';
import { Button } from '../button/button';
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
  isLiked
}: TUserOfferProps) => (
  <div className={styles.card}>
    <div className={styles.cardActions} />
    <div className={styles.cardMain}>
      <TitleUI size='H1' text={skillName} />
      <p className={styles.cardCategory}>
        {categoryName} / {subcategoryName}
      </p>
      <p className={styles.cardText}>{description}</p>
      {justAdded ? (
        <Button
          buttonType='secondary'
          text='Редактировать'
          icon={editIcon}
          iconPosition='right'
        />
      ) : requestStatus === 'sended' ? (
        <Button
          buttonType='secondary'
          text='Обмен предложен'
          icon={clockIcon}
          iconPosition='left'
        />
      ) : requestStatus === 'rejected' ? (
        <Button buttonType='secondary' text='Запрос отклонен' />
      ) : requestStatus === 'approved' ? (
        <Button buttonType='secondary' text='Запрос принят' />
      ) : (
        <Button text='Предложить обмен' />
      )}
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
