import { useEffect, useState } from 'react';
import { useSelector } from '@/app/store/store';
import { categoriesList } from '@/entities/categories/categories-slice';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { pickCategory } from '@/shared/lib/pick-categories';
import { Button } from '@/shared/ui/button';
import { ModalUI } from '@/shared/ui/modal';
import styles from './skill-preview.module.scss';
import type { SkillPreviewProps } from './type';

export const SkillPreviewModal = ({
  formData,
  onClose,
  onEdit,
  onConfirm
}: SkillPreviewProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const allCategories = useSelector(categoriesList);
  const categoryTitle = pickCategory(
    allCategories,
    formData.categoryId,
    formData.subcategoryId
  );

  useEffect(() => {
    if (formData.images?.length) {
      const urls = formData.images.map((file) => URL.createObjectURL(file));
      setPreviews(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [formData.images]);

  return (
    <ModalUI
      onClose={onClose}
      title='Ваше предложение'
      description='Пожалуйста, проверьте и подтвердите правильность данных'
      mode='dialog'
      zIndex={20}
    >
      <div className={styles.modalContent}>
        <div className={styles.description}>
          <div className={styles.caption}>
            <p className={styles.title}>{formData.skillName}</p>
            <p className={styles.category}>
              {categoryTitle ? (
                <>
                  {categoryTitle.categoryTitle} /
                  {categoryTitle.subcategoryTitle}
                </>
              ) : (
                <p className={styles.error}>Не удалось определить категорию</p>
              )}
            </p>
          </div>
          <p className={styles.text}>{formData.description}</p>
          <div className={styles.buttons}>
            <Button
              onClick={onEdit}
              className={styles.buttonEdit}
              text='Редактировать'
              buttonType='secondary'
              icon={<EditIcon />}
              iconPosition='right'
            />
            <Button
              onClick={onConfirm}
              text='Готово'
              className={styles.buttonSubmit}
            />
          </div>
        </div>
        {previews.length > 0 && (
          <div className={styles.gallery}>
            {previews.map((src, i) => {
              if (i === 0) {
                return (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className={styles.main}
                  />
                );
              }

              if (i === 3) {
                const extraCount = previews.length - 4;
                return extraCount > 0 ? (
                  <div key={i} className={styles.overlay}>
                    <div className={styles.extraImage}>+{extraCount}</div>
                    <img
                      key={i}
                      src={src}
                      alt={`preview-${i}`}
                      className={styles.thumb}
                    />
                  </div>
                ) : (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className={styles.thumb}
                  />
                );
              }

              if (i < 3) {
                return (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className={styles.thumb}
                  />
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </ModalUI>
  );
};
