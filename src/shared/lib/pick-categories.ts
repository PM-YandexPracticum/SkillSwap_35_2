import type { TCategories } from '@/api/types';

interface PickCategoryResult {
  categoryId: number;
  categoryTitle: string;
  subcategoryId: number;
  subcategoryTitle: string;
}
// утилита для сопоставление категории и подкатегории с их названиями
/*
categories - массив категорий с подкатегориями (получаем с пом селектора из слайса)
categoryId - число или строка категории (форма возвращает строку, с апи приходит число)
subcategoryId - число или строка подкатегории
возвращает объект с categoryTitle и subcategoryTitle
*/

export function pickCategory(
  categories: TCategories[],
  categoryId: number | string,
  subcategoryId: number | string
): PickCategoryResult | null {
  const catId = Number(categoryId);
  const subId = Number(subcategoryId);

  const category = categories.find((c) => c.categoryId === catId);
  if (!category) return null;

  const subcategory = category.subcategories.find(
    (s) => s.subcategoryId === subId
  );
  if (!subcategory) return null;

  return {
    categoryId: category.categoryId,
    categoryTitle: category.title,
    subcategoryId: subcategory.subcategoryId,
    subcategoryTitle: subcategory.title
  };
}

/* Как использовать
const allCategories = useSelector(categoriesList);

// допустим, пришло из формы:
const catId = 5;
const subId = 54;

const result = pickCategory(allCategories, catId, subId);

*/
