export interface IPanelFiltersProps {
  //Колбэк при изменении фильтров
  onFiltersChange?: (filters: IPanelFiltersState) => void;
  //Начальное состояние фильтров
  initialFilters?: Partial<IPanelFiltersState>;
  //Список доступных навыков для фильтрации
  availableSkills?: IFilterOption[];
  //Список доступных городов для фильтрации
  availableCities?: IFilterOption[];
  //className для контейнера
  className?: string;
}

export interface IPanelFiltersState {
  // Режим фильтрации
  mode: 'all' | 'learn' | 'teach';
  // Выбранные навыки (ID)
  skills: number[];
  // Выбранный пол
  gender: 'any' | 'male' | 'female';
  // Выбранные города
  cities: string[];
}

export interface IFilterOption {
  value: string;
  label: string;
}
