import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useSelector } from '@/app/store/store';
import { categoriesList } from '@/entities/categories/categories-slice';
import UploadIcon from '@/shared/assets/icons/upload-photo.svg';
import { Button } from '@/shared/ui/button';
import { DatePicker } from '@/shared/ui/date-picker';
import { Dropdown } from '@/shared/ui/dropdown/dropdown';
import { cityOptions } from '@/shared/ui/dropdown/dropdownConstants';
import { Input } from '@/shared/ui/input';
import styles from './registration-user-form.module.scss';
import type {
  UserFormFields,
  UserFormUIProps,
  DropdownOptionType
} from './type';

export const UserFormUI = ({
  prevStepClick,
  nextStepClick,
  defaultValues
}: UserFormUIProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid }
  } = useForm<UserFormFields>({
    mode: 'onChange',
    defaultValues: defaultValues || {
      name: '',
      birthDate: undefined,
      gender: '',
      location: '',
      categories: [],
      subcategories: [],
      profileImage: null
    }
  });

  const [preview, setPreview] = useState<string | null>(
    defaultValues?.profileImage
      ? URL.createObjectURL(defaultValues.profileImage)
      : null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const categoriesSelector = useSelector(categoriesList);

  // загружаем опции для категорий
  const categoryOptions: DropdownOptionType[] = categoriesSelector.map(
    (cat) => ({
      value: String(cat.categoryId),
      label: cat.title
    })
  );

  // загружаем опции для подкатегорий с возможностью сброса поля, если категория поменялась
  const allSubcategories = categoriesSelector.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      ...sub,
      categoryId: String(cat.categoryId)
    }))
  );
  const selectedCategories = watch('categories') || [];
  const subcategoryOptions = allSubcategories
    .filter((sub) => selectedCategories.includes(sub.categoryId))
    .map((sub) => ({ value: String(sub.subcategoryId), label: sub.title }));

  // обработчик onChange для поля с изображением
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // сабмит
  const onSubmit = (data: UserFormFields) => {
    const dataToSend = {
      ...data,
      profileImage: selectedFile
    };
    nextStepClick(dataToSend);
  };

  return (
    <form className={styles.form} encType='multipart/form-data'>
      <div className={styles.wrapper}>
        <input
          id='avatar'
          placeholder='Добавьте вашу фотографию'
          type='file'
          accept='image/*'
          className={styles.input}
          onChange={handleImageUpload}
        />
        <label htmlFor='avatar' className={styles.label}>
          <div className={styles.circle}>
            {preview ? (
              <img
                src={preview}
                alt='User profile preview'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <UploadIcon />
            )}
          </div>
        </label>
      </div>

      <Input
        placeholder='Введите ваше имя'
        label='Имя'
        type='text'
        className={styles.inputName}
        inputClassName=''
        {...register('name', { required: true })}
      />

      <div className={styles.row}>
        <Controller
          control={control}
          name='birthDate'
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={(date: string | undefined) => field.onChange(date)}
            />
          )}
        />

        <Controller
          control={control}
          name='gender'
          rules={{ required: true }}
          render={({ field }) => (
            <Dropdown
              options={[
                { label: 'Мужской', value: 'male' },
                { label: 'Женский', value: 'female' }
              ]}
              title='Пол'
              placeholder='Не указан'
              type='select'
              value={field.value}
              onChange={field.onChange}
              className={styles.selectGender}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name='location'
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            options={cityOptions}
            title='Город'
            placeholder='Не указан'
            type='searchable'
            value={field.value}
            onChange={field.onChange}
            className={styles.select}
          />
        )}
      />

      <Controller
        control={control}
        name='categories'
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            options={categoryOptions}
            title='Категория навыка, которому хотите научиться'
            placeholder='Выберите категорию'
            type='multiple'
            value={field.value}
            onChange={(ids) =>
              field.onChange(
                Array.isArray(ids) ? ids.map(String) : [String(ids)]
              )
            }
            className={styles.select}
          />
        )}
      />

      <Controller
        control={control}
        name='subcategories'
        rules={{ required: true }}
        render={({ field }) => (
          <Dropdown
            options={subcategoryOptions}
            value={field.value}
            onChange={(ids) =>
              field.onChange(
                Array.isArray(ids) ? ids.map(String) : [String(ids)]
              )
            }
            title='Подкатегория навыка, которому хотите научиться'
            placeholder='Выберите подкатегорию'
            type='multiple'
            className={styles.select}
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
