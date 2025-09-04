import type { TSubcategories } from '@/api/types';

type Category = {
  categoryId: number;
  title: string;
  subcategories: TSubcategories[];
};

// превращает все в один массив
export const flattenSubcategories = (
  categories: Category[]
): TSubcategories[] => categories.flatMap((c) => c.subcategories);

// выбрать подкатегории по списку id
export const pickSubcategoriesByIds = (
  categories: Category[],
  selectedIds: Array<string | number>
): TSubcategories[] => {
  if (!selectedIds?.length) return [];
  const idSet = new Set(selectedIds.map(Number));
  const result: TSubcategories[] = [];

  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      if (idSet.has(sub.subcategoryId)) {
        result.push({ subcategoryId: sub.subcategoryId, title: sub.title });
      }
    }
  }
  return result;
};
