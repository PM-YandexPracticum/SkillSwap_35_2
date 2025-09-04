import type { TSubcategories } from '@/api/types';

export type SkillFormFields = {
  skillName: string;
  categoryId: string;
  subcategoryId: string;
  description: string;
  images: File[];
};

export type SkillFormUIProps = {
  prevStepClick: () => void;
  nextStepClick: (data: SkillFormFields) => void;
  defaultValues?: SkillFormFields;
};

export type DropdownOptionType = {
  value: string;
  label: string;
  data?: TSubcategories;
};
