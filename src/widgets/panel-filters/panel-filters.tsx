import { useState, useEffect, useMemo } from 'react';
import { getCategoriesApi } from '@/api/skill-api';
import { Button, Checkbox, RadioGroup, TitleUI } from '@/shared/ui/';
import {
  DEFAULT_CITIES,
  DEFAULT_FILTERS,
  type TCategories
} from './panel-filters-constants';
import type {
  IPanelFiltersProps,
  IPanelFiltersState
} from './panel-filters-types';
import styles from './panel-filters.module.scss';

export const PanelFilters: React.FC<IPanelFiltersProps> = ({
  onFiltersChange,
  initialFilters,
  availableCities = DEFAULT_CITIES,
  className = ''
}) => {
  // Состояние фильтров
  const [filters, setFilters] = useState<IPanelFiltersState>({
    ...DEFAULT_FILTERS,
    ...initialFilters
  });

  // Состояние для загрузки категорий
  const [categoriesData, setCategoriesData] = useState<TCategories[]>([]);
  const [loading, setLoading] = useState(true);

  // Загружаем категории из API
  useEffect(() => {
    getCategoriesApi()
      .then((response) => {
        if (response.success) {
          setCategoriesData(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load categories:', error);
        setLoading(false);
      });
  }, []);

  // Преобразуем категории в формат для чекбоксов
  const availableCategories = useMemo(
    () =>
      categoriesData.map((category) => ({
        value: category.categoryId,
        label: category.title
      })),
    [categoriesData]
  );

  // Колбэк при изменении фильтров
  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  // Обработчики изменений
  const handleModeChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      mode: value as IPanelFiltersState['mode']
    }));
  };

  const handleGenderChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      gender: value as IPanelFiltersState['gender']
    }));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const skillId = Number(value); // преобразуем string в number

    setFilters((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, skillId]
        : prev.skills.filter((skill) => skill !== skillId)
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      cities: checked
        ? [...prev.cities, value]
        : prev.cities.filter((city) => city !== value)
    }));
  };

  // Сброс фильтров
  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Подсчет активных фильтров
  const activeFiltersCount = useMemo(
    () =>
      [
        filters.mode !== 'all' ? 1 : 0,
        filters.gender !== 'any' ? 1 : 0,
        filters.skills.length,
        filters.cities.length
      ].reduce((sum, count) => sum + count, 0),
    [filters]
  );

  if (loading) {
    return (
      <aside className={`${styles.panel} ${className}`}>
        <div className={styles.loading}>Загрузка категорий...</div>
      </aside>
    );
  }

  return (
    <aside className={`${styles.panel} ${className}`}>
      {/* Шапка с заголовком и кнопкой сброса */}
      <div className={styles.header}>
        <TitleUI size='H2' text={`Фильтры (${activeFiltersCount})`} />
        {activeFiltersCount > 0 && (
          <Button
            buttonType='tertiary'
            text='Сбросить Х'
            className={styles.resetBtn}
            onClick={handleReset}
          />
        )}
      </div>

      {/* Секция режима */}
      <div className={styles.section}>
        <TitleUI size='H3' text='Режим' />
        <RadioGroup
          name='mode'
          selectedValue={filters.mode}
          onChange={handleModeChange}
          options={[
            { value: 'all', label: 'Все' },
            { value: 'learn', label: 'Хочу научиться' },
            { value: 'teach', label: 'Могу научить' }
          ]}
        />
      </div>

      {/* Секция категорий */}
      <div className={styles.section}>
        <TitleUI size='H3' text='Категории' />
        {availableCategories.map((category) => (
          <Checkbox
            key={category.value}
            name='skills'
            value={String(category.value)}
            label={category.label}
            checked={filters.skills.includes(category.value)}
            onChange={handleSkillChange}
          />
        ))}
      </div>

      {/* Секция пола */}
      <div className={styles.section}>
        <TitleUI size='H3' text='Пол автора' />
        <RadioGroup
          name='gender'
          selectedValue={filters.gender}
          onChange={handleGenderChange}
          options={[
            { value: 'any', label: 'Не важно' },
            { value: 'male', label: 'Мужской' },
            { value: 'female', label: 'Женский' }
          ]}
        />
      </div>

      {/* Секция города */}
      <div className={styles.section}>
        <TitleUI size='H3' text='Город' />
        {availableCities.map((city) => (
          <Checkbox
            key={city.value}
            name='cities'
            value={city.value}
            label={city.label}
            checked={filters.cities.includes(city.value)}
            onChange={handleCityChange}
          />
        ))}
      </div>
    </aside>
  );
};
