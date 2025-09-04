import { useEffect } from 'react';
import { Button, Checkbox, RadioGroup, TitleUI } from '@/shared/ui/';
import { cityOptions } from '@/shared/ui/dropdown/dropdownConstants';
import ChevronDown from '../../shared/assets/icons/chevron-down.svg?url';
import ChevronUp from '../../shared/assets/icons/chevron-up.svg?url';
import { usePanelFilters } from './hooks/use-panel-filters';
import type { IPanelFiltersProps } from './panel-filters-types';
import styles from './panel-filters.module.scss';

export const PanelFilters = ({
  onFiltersChange,
  initialFilters,
  className = ''
}: IPanelFiltersProps) => {
  const {
    filters,
    loading,
    error,
    availableCategories,
    activeFiltersCount,
    openCategories,
    getSubcategoryOptions,
    getSelectedSubcategories,
    handleModeChange,
    handleGenderChange,
    handleCategoryClick,
    handleSubcategoryChange,
    handleCityChange,
    handleReset,
    openCities,
    visibleCities,
    toggleCitiesOpen,
    openCats,
    toggleCatsOpen
  } = usePanelFilters(initialFilters);

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  if (loading)
    return (
      <aside className={`${styles.panel} ${className}`}>
        <div className={styles.loading}>Загрузка категорий...</div>
      </aside>
    );

  if (error) {
    return (
      <aside className={`${styles.panel} ${className}`}>
        <div className={styles.error}>
          Ошибка загрузки категорий: {error}
          <Button
            buttonType='primary'
            text='Попробовать снова'
            onClick={() => window.location.reload()}
          />
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${styles.panel} ${className}`}>
      {/* Заголовок */}
      <div className={styles.header}>
        <TitleUI size='h2' text={`Фильтры (${activeFiltersCount})`} />

        <Button
          buttonType='tertiary'
          text='Сбросить х'
          className={`${styles.resetBtn} ${activeFiltersCount > 0 ? styles.visible : ''}`}
          onClick={handleReset}
        />
      </div>

      {/* Режим */}
      <div className={styles.section}>
        <TitleUI size='h3' text='Режим' />
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

      {/* Категории */}
      <div className={styles.section}>
        <TitleUI size='h3' text='Категории' />
        {availableCategories.map((category) => {
          const categoryId = Number(category.value);
          const selectedSubs = getSelectedSubcategories(categoryId);
          const isOpen = openCategories[categoryId] ?? false;

          let parentVariant: 'category' | 'subcategory' | undefined;
          if (isOpen) parentVariant = 'subcategory';
          else if (selectedSubs.length > 0) parentVariant = 'category';
          else parentVariant = undefined;

          return (
            <div key={category.value} className={styles.categoryItem}>
              <div className={styles.categoryHeader}>
                <Checkbox
                  name='category'
                  value={category.value.toString()}
                  label={category.label}
                  checked={filters.category.includes(categoryId)}
                  variant={parentVariant}
                  onChange={() => handleCategoryClick(categoryId)}
                />
                {category.subcategories?.length > 0 && (
                  <Button
                    buttonType='iconOnly'
                    icon={
                      <img
                        src={isOpen ? ChevronUp : ChevronDown}
                        alt='chevron'
                        style={{ width: 16, height: 16 }}
                      />
                    }
                    onClick={() => handleCategoryClick(categoryId)}
                  />
                )}
              </div>
              {/* Сабкатегории */}
              {isOpen && category.subcategories?.length > 0 && (
                <div className={styles.subcategories}>
                  {getSubcategoryOptions(categoryId).map((sub) => {
                    const subSelected = selectedSubs.includes(
                      Number(sub.value)
                    );
                    return (
                      <Checkbox
                        key={sub.value}
                        name={`subcategory-${categoryId}`}
                        value={sub.value}
                        label={sub.label}
                        checked={subSelected}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          const updated = checked
                            ? [...selectedSubs, Number(value)]
                            : selectedSubs.filter((id) => id !== Number(value));
                          handleSubcategoryChange(
                            categoryId,
                            updated.map(String)
                          );
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <Button
          buttonType='tertiary'
          className={styles.showAllBtn}
          onClick={toggleCatsOpen}
          text={openCats ? 'Скрыть' : 'Все категории'}
          icon={<img src={openCats ? ChevronUp : ChevronDown} alt='chevron' />}
          iconPosition='right'
        />
        {openCats && (
          <div style={{ marginTop: 8, textAlign: 'center' }}>
            <img
              src='https://cs12.pikabu.ru/post_img/big/2021/11/10/4/1636522121188593136.png'
              alt='Рикрол'
              style={{ maxWidth: '100px' }}
            />
          </div>
        )}
      </div>

      {/* Пол */}
      <div className={styles.section}>
        <TitleUI size='h3' text='Пол автора' />
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

      {/* Города */}
      <div className={styles.section}>
        <TitleUI size='h3' text='Город' />
        {visibleCities.map((city) => (
          <Checkbox
            key={city.value}
            name='cities'
            value={city.value}
            label={city.label}
            checked={filters.cities.includes(city.value)}
            onChange={handleCityChange}
          />
        ))}

        {cityOptions.length > 6 && (
          <Button
            buttonType='tertiary'
            className={styles.showAllBtn}
            onClick={toggleCitiesOpen}
            text={openCities ? 'Скрыть' : 'Все города'}
            icon={
              <img src={openCities ? ChevronUp : ChevronDown} alt='chevron' />
            }
            iconPosition='right'
          />
        )}
      </div>
    </aside>
  );
};
