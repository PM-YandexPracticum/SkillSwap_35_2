import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from '@/app/store/store';

import { categoriesList } from '@/entities/categories/categories-slice';
import { Button } from '@/shared/ui/button';
import { DragAndDrop } from '@/shared/ui/drag-and-drop';
import { Dropdown } from '@/shared/ui/dropdown/dropdown';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import styles from './registration-skill-form.module.scss';
import type {
  SkillFormFields,
  SkillFormUIProps,
  DropdownOptionType
} from './type';

export const SkillFormUI = ({
  prevStepClick,
  nextStepClick,
  defaultValues
}: SkillFormUIProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid }
  } = useForm<SkillFormFields>({
    mode: 'all',
    defaultValues: defaultValues || {
      skillName: '',
      categoryId: '',
      subcategoryId: '',
      description: '',
      images: []
    }
  });
  const [files, setFiles] = useState<File[]>(defaultValues?.images || []);
  const categories = useSelector(categoriesList);

  // подгружаем доступные опции для поля категорий
  const categoryOptions: DropdownOptionType[] = categories.map((cat) => ({
    value: String(cat.categoryId),
    label: cat.title
  }));

  // выбранная категория
  const selectedCategoryId = watch('categoryId');

  // список подкатегорий в зависимости от выбранной категории
  const subcategoryOptions: DropdownOptionType[] =
    categories
      .find((cat) => String(cat.categoryId) === selectedCategoryId)
      ?.subcategories.map((sub) => ({
        value: String(sub.subcategoryId),
        label: sub.title
      })) ?? [];

  // Хендлер для drag-n-drop компонента
  const handleDrop = (droppedFiles: File[]) => {
    setFiles(droppedFiles);
    setValue('images', droppedFiles, { shouldValidate: true });
  };

  const onSubmit = (data: SkillFormFields) => {
    nextStepClick?.(data);
    console.log(data);
  };

  return (
    <form className={styles.form} encType='multipart/form-data'>
      <Input
        placeholder='Введите название вашего навыка'
        label='Название навыка'
        type='text'
        {...register('skillName', { required: true })}
      />

      <Controller
        control={control}
        name='categoryId'
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            options={categoryOptions}
            title='Категория навыка'
            placeholder='Выберите категорию навыка'
            type='select'
            value={field.value}
            onChange={(val) => {
              field.onChange(val);
              setValue('subcategoryId', '');
            }}
            className={styles.select}
          />
        )}
      />

      <Controller
        control={control}
        name='subcategoryId'
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            options={subcategoryOptions}
            value={field.value}
            onChange={field.onChange}
            title='Подкатегория навыка'
            placeholder='Выберите подкатегорию навыка'
            type='select'
            className={styles.select}
          />
        )}
      />

      <Textarea
        label='Описание'
        placeholder='Коротко опишите, чему можете научить'
        className='wrapper'
        textareaClassName='textarea'
        {...register('description', { required: true })}
      />

      <Controller
        control={control}
        name='images'
        render={({ field }) => (
          <DragAndDrop
            onFilesAdded={handleDrop}
            text='Перетащите или выберите изображения навыка'
            buttonText='Выбрать изображения'
          />
        )}
      />

      <div className={styles.buttons}>
        <Button
          buttonType='secondary'
          text='Назад'
          className={styles.buttonPrev}
          htmlType='button'
          onClick={prevStepClick}
        />
        <Button
          buttonType='primary'
          text='Продолжить'
          className={styles.buttonNext}
          htmlType='button'
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
