import type { TSubcategories } from '@/api/types';

export type UserFormFields = {
  profileImage: File | null;
  name: string;
  birthDate: string;
  gender: string;
  location: string;
  categories: string[];
  subcategories: string[];
};

export type UserFormUIProps = {
  prevStepClick: () => void;
  nextStepClick: (data: UserFormFields) => void;
  defaultValues?: UserFormFields;
};

export type DropdownOptionType = {
  value: string;
  label: string;
  data?: TSubcategories;
};
