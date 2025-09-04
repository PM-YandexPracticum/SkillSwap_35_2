import clsx from 'clsx';
import { useEffect, useState, type FC } from 'react';
import EditIcon from '../../shared/assets/icons/edit.svg';
import editAvatar from '../../shared/assets/icons/gallery-edit.svg?url';
import { Button } from '../../shared/ui/button/button.tsx';
import { DatePicker } from '../../shared/ui/date-picker/date-picker.tsx';
import { Dropdown } from '../../shared/ui/dropdown/dropdown.tsx';
import {
  cityOptions,
  genderOptions
} from '../../shared/ui/dropdown/dropdownConstants.tsx';
import { Input } from '../../shared/ui/input/input.tsx';
import { TextareaBase } from '../../shared/ui/textarea/textarea.tsx';
import styles from './users-profile.module.scss';
const DEFAULT_AVATAR =
  'https://media.istockphoto.com/id/614724736/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%80%D0%B0%D0%B7%D0%B4%D0%BD%D0%B8%D1%87%D0%BD%D1%8B%D0%B9-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%BD%D0%BE%D1%8F%D0%B1%D1%80%D1%8F.jpg?s=612x612&w=0&k=20&c=Oh8GH3HpO2S3MS4orAyoUkXLKPoiFqKOZptKpXaSmew=';

const INITIAL_ERRORS = {
  name: '',
  email: '',
  password: '',
  gender: '',
  city: '',
  description: '',
  birthDate: ''
};

type UserInLocalStorage = {
  description: string;
  password: string;
  email: string;
  name: string;
  birthDate: string | null;
  gender: string;
  city: string;
  avatar: string | null;
};

export const getStoredUserData = (): UserInLocalStorage | null => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const storedUserJson = localStorage.getItem('user');
    if (!storedUserJson) return null;

    const userData: UserInLocalStorage = JSON.parse(storedUserJson);
    return userData && typeof userData === 'object' ? userData : null;
  } catch (error) {
    console.error('Error reading user data:', error);
    try {
      localStorage.removeItem('user');
    } catch (cleanupError) {
      console.error('Error removing corrupted data:', cleanupError);
    }
    return null;
  }
};

export const saveUserToStorage = (data: Partial<UserInLocalStorage>) => {
  localStorage.setItem('user', JSON.stringify(data));
};

// Функция для сравнения объектов по значениям ключей
const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2 || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) return false;
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

// Функция для проверки наличия ошибок
const hasErrors = (errors: typeof INITIAL_ERRORS): boolean =>
  Object.values(errors).some((error) => error !== '');

export const UsersProfile: FC = () => {
  const userData = getStoredUserData();
  const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState(false);
  const [formData, setFormData] = useState<UserInLocalStorage>(() =>
    userData ? { ...userData } : ({} as UserInLocalStorage)
  );

  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  useEffect(() => {
    const isDataChanged = !areObjectsEqual(userData, formData);

    setIsSaveButtonDisabled(!isDataChanged);
  }, [userData, formData]);
    const hasValidationErrors = hasErrors(errors);
    setIsSaveButtonDisabled(!isDataChanged || hasValidationErrors);
  }, [userData, formData, errors]);

  const handleFieldChange =
    (field: keyof UserInLocalStorage) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleGenderSelect = (value: string | string[]) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, gender: value }));
      setErrors((prev) => ({ ...prev, gender: '' }));
    }
  };

  const handleCitySelect = (value: string | string[]) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, city: value }));
      setErrors((prev) => ({ ...prev, city: '' }));
    }
  };

  const handleDateChange = (dateString: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: dateString || null
    }));
  };

  const togglePasswordFieldVisibility = () => {
    setIsPasswordFieldVisible((prev) => !prev);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      saveUserToStorage(formData);
      setIsSaveButtonDisabled(true);
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <form className={styles.profileForm} onSubmit={handleFormSubmit}>
        <Input
          className={styles.input}
          label='Почта'
          name='email'
          type='email'
          placeholder='Введите email'
          value={formData.email || ''}
          onChange={handleFieldChange('email')}
          iconStyleOverride={{ right: '12px' }}
          inputClassName={styles.searchInput}
          icon={<EditIcon />}
        />

        <button
          type='button'
          className={styles.password_change_button}
          onClick={togglePasswordFieldVisibility}
        >
          Изменить пароль
        </button>

        {isPasswordFieldVisible && (
          <Input
            label='Пароль'
            name='password'
            type='password'
            placeholder='Введите ваш пароль'
            value={formData.password || ''}
            onChange={handleFieldChange('password')}
            iconStyleOverride={{ right: '12px' }}
            inputClassName={styles.searchInput}
            icon={<EditIcon />}
          />
        )}

        <Input
          label='Имя'
          name='name'
          type='text'
          placeholder='Введите имя'
          value={formData.name || ''}
          onChange={handleFieldChange('name')}
          iconStyleOverride={{ right: '12px' }}
          inputClassName={styles.searchInput}
          icon={<EditIcon />}
        />

        <div className={styles.formRow}>
          <div className={styles.birthDateField}>
            <DatePicker
              value={formData.birthDate || undefined}
              onChange={handleDateChange}
            />
          </div>

          <div className={styles.genderField}>
            <Dropdown
              title='Пол'
              options={genderOptions}
              type='select'
              placeholder='Не выбран'
              value={formData.gender || ''}
              onChange={handleGenderSelect}
              error={!!errors.gender}
              className={clsx(styles.dropdown, styles.dropdownText)}
            />
          </div>
        </div>

        <div className={styles.cityOptions}>
          <div>
            <Dropdown
              title='Город'
              options={cityOptions}
              type='searchable'
              placeholder='Не указан'
              value={formData.city || ''}
              onChange={handleCitySelect}
              error={!!errors.city}
              className={styles.dropdownText}
            />
          </div>

          <TextareaBase
            label='О себе'
            placeholder='Расскажите немного о себе'
            value={formData.description || ''}
            onChange={handleFieldChange('description')}
            error={errors.description}
            icon={<EditIcon />}
            iconStyleOverride={{ right: '20px' }}
            textareaClassName={styles.textareaField}
            rows={5}
            textareaPadding={{
              paddingRight: '52px',
              paddingLeft: '20px',
              paddingTop: '12px',
              paddingBottom: '12px'
            }}
          />
        </div>

        <Button
          buttonType='primary'
          className={styles.saveButton}
          htmlType='submit'
          disabled={isSaveButtonDisabled}
          text={'Сохранить'}
        />
      </form>

      <div className={styles.avatarContainer}>
        <img
          src={formData.avatar || DEFAULT_AVATAR}
          className={styles.avatarImage}
          alt='Аватар'
        />
        <img
          src={editAvatar}
          alt='Редактировать'
          className={styles.avatarEditButton}
        />
      </div>
    </div>
  );
};
