import type { UserFormFields } from '@/widgets/registration-user-form/type';

export type RegistrationUserProps = {
  onNextClick: (values: UserFormFields) => void;
  onPrevClick: () => void;
  defaultValues?: UserFormFields;
};
