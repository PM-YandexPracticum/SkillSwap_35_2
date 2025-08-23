import type { TCategoriesResponse } from '@/api/skill-api';
import type {
  IFilterOption,
  IPanelFiltersState
} from '../panel-filters/panel-filters-types';

export const DEFAULT_FILTERS: IPanelFiltersState = {
  mode: 'all',
  skills: [],
  gender: 'any',
  cities: []
};

export type TCategories = {
  categoryId: number;
  title: string;
  subcategories: TSubcategories[];
};

export type TSubcategories = {
  subcagegoryId: number;
  title: string;
};

export const getCategoriesApi = (): Promise<TCategoriesResponse> =>
  fetch('/db/categories.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(
      (data: any[]) =>
        new Promise<TCategoriesResponse>((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              data: data // Возвращаем сырые данные из JSON
            });
          }, 1500);
        })
    )
    .catch((error) => {
      console.error('Error fetching categories:', error);
      return {
        success: false,
        data: [],
        error: error.message
      };
    });

// Дефолтные опции для навыков и городов (на случай, если не передадут пропсы)
export const DEFAULT_SKILLS: IFilterOption[] = [
  { value: 'design', label: 'Дизайн' },
  { value: 'programming', label: 'Программирование' },
  { value: 'marketing', label: 'Маркетинг' },
  { value: 'english', label: 'Английский язык' }
];

export const DEFAULT_CITIES: IFilterOption[] = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'novosib', label: 'Новосибирск' },
  { value: 'ekat', label: 'Екатеринбург' },
  { value: 'kazan', label: 'Казань' }
];
