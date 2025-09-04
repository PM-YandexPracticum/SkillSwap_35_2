import { useState, useEffect, useMemo, useCallback } from 'react';
//import { getCategoriesApi } from '@/api/skill-api';
//import type { TCategories } from '@/api/types';
import {
  getCategoriesThunk,
  categoriesList,
  categoriesIsLoading,
  categoriesError
} from '@/entities/categories/categories-slice';
import { cityOptions } from '@/shared/ui/dropdown/dropdownConstants';
import { useDispatch, useSelector } from '../../../app/store/store';
import type { IPanelFiltersState } from '../panel-filters-types';

export const usePanelFilters = (
  initialFilters?: Partial<IPanelFiltersState>
) => {
  const dispatch = useDispatch();
  const categoriesData = useSelector(categoriesList);
  const loading = useSelector(categoriesIsLoading);
  const error = useSelector(categoriesError);
  const [filters, setFilters] = useState<IPanelFiltersState>({
    mode: 'all',
    category: [],
    subcategories: {}, // { [categoryId]: number[] }
    gender: 'any',
    cities: [],
    ...initialFilters
  });

  //const [categoriesData, setCategoriesData] = useState<TCategories[]>([]);
  //const [loading, setLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState<{
    [id: number]: boolean;
  }>({});

  //  для кнопки Все города
  const [openCities, setOpenCities] = useState(false);
  const toggleCitiesOpen = useCallback(
    () => setOpenCities((prev) => !prev),
    []
  );
  const visibleCities = useMemo(
    () => (openCities ? cityOptions : cityOptions.slice(0, 6)),
    [openCities]
  );

  //  для кнопки Все категории
  const [openCats, setOpenCats] = useState(false);
  const toggleCatsOpen = useCallback(() => setOpenCats((prev) => !prev), []);

  // useEffect(() => {
  //   getCategoriesApi()
  //     .then((res) => {
  //       if (res.success) setCategoriesData(res.data);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const availableCategories = useMemo(
    () =>
      categoriesData.map((c) => ({
        value: c.categoryId,
        label: c.title,
        subcategories: c.subcategories
      })),
    [categoriesData]
  );

  const getSubcategoryOptions = useCallback(
    (categoryId: number) => {
      const category = categoriesData.find((c) => c.categoryId === categoryId);
      if (!category) return [];
      return category.subcategories.map((sub) => ({
        value: String(sub.subcategoryId),
        label: sub.title
      }));
    },
    [categoriesData]
  );

  const getSelectedSubcategories = useCallback(
    (categoryId: number) => filters.subcategories[categoryId] ?? [],
    [filters.subcategories]
  );

  const handleCategoryClick = useCallback(
    (categoryId: number) => {
      const isOpen = openCategories[categoryId] ?? false;
      const selectedSubs = getSelectedSubcategories(categoryId);

      if (isOpen) {
        setOpenCategories((prev) => ({ ...prev, [categoryId]: false }));
        setFilters((prev) => {
          const hasSelectedSubs = selectedSubs.length > 0;
          const newCategoryList = hasSelectedSubs
            ? [...new Set([...prev.category, categoryId])]
            : prev.category.filter((id) => id !== categoryId);
          return { ...prev, category: newCategoryList };
        });
      } else {
        setOpenCategories((prev) => ({ ...prev, [categoryId]: true }));
        setFilters((prev) => ({
          ...prev,
          category: [...new Set([...prev.category, categoryId])]
        }));
      }
    },
    [openCategories, getSelectedSubcategories]
  );

  const handleSubcategoryChange = useCallback(
    (categoryId: number, selectedSubs: string[]) => {
      const subcategoryIds = selectedSubs.map(Number);
      setFilters((prev) => ({
        ...prev,
        subcategories: { ...prev.subcategories, [categoryId]: subcategoryIds }
      }));
    },
    []
  );

  const handleModeChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      mode: value as IPanelFiltersState['mode']
    }));
  }, []);

  const handleGenderChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      gender: value as IPanelFiltersState['gender']
    }));
  }, []);

  const handleCityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
      setFilters((prev) => ({
        ...prev,
        cities: checked
          ? [...prev.cities, value]
          : prev.cities.filter((c) => c !== value)
      }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setFilters({
      mode: 'all',
      category: [],
      subcategories: {},
      gender: 'any',
      cities: []
    });
    setOpenCategories({});
    setOpenCities(false);
  }, []);

  const activeFiltersCount = useMemo(() => {
    const categoriesCount = [
      filters.mode !== 'all' ? 1 : 0,
      filters.gender !== 'any' ? 1 : 0,
      filters.cities.length
    ].reduce((sum, c) => sum + c, 0);

    const subcategoriesCount = Object.values(filters.subcategories).flat()
      .length;

    return categoriesCount + subcategoriesCount;
  }, [filters]);

  return {
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
    toggleCitiesOpen,
    visibleCities,
    openCats,
    toggleCatsOpen
  };
};
