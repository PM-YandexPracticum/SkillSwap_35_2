export type LoginFormFields = {
  email: string;
  password: string;
};

export type LoginUIProps = {
  errorText?: string;
  onSubmit: (data: LoginFormFields) => void;
  buttonText: string;
  buttonType?: 'submit' | 'button'; // тип кнопки для сценария в регистрации
  onButtonClick?: () => void; // действие по клику для сценария в регистрации
};
