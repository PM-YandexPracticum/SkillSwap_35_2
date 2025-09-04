import type { LoginFormFields } from '@/widgets/registration-login-form/type';

export type RegistrationLoginProps = {
  onNextClick: (values: LoginFormFields) => void;
  defaultValues?: LoginFormFields;
};
