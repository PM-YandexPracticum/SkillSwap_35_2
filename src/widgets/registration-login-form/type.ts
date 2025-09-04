export type LoginFormFields = {
  email: string;
  password: string;
};

export type RegistrationLoginUIProps = {
  onButtonClick?: (values: LoginFormFields) => void;
  defaultValues?: LoginFormFields;
};
