import { useState } from 'react';
import type { TLoginData } from '@/api/skill-api';
import { useDispatch } from '@/app/store/store';
import { loginUserThunk } from '@/entities/user/user-slice';
import { LoginFormUI } from '@/widgets/login-form/login-form';
import type { LoginFormFeatureProps } from './type';

export const LoginFeature = ({ onSuccess, onError }: LoginFormFeatureProps) => {
  const dispatch = useDispatch();
  const [errorText, setErrorText] = useState<string | undefined>(undefined);

  const handleLogin = async (data: TLoginData) => {
    try {
      setErrorText(undefined);
      await dispatch(loginUserThunk(data)).unwrap();
      onSuccess?.();
      console.log('Успешный вход');
      // если видно вывод в консоль — можно делать редирект или закрытие модалки
      // TODO: добавить сбсро полей при успешном сабмите
    } catch (err) {
      // если санка вернула rejectWithValue
      const errorMessage = err as string;
      setErrorText(errorMessage);
      onError?.(errorMessage);
      console.log('Не получилось войти', data);
    }
  };

  return (
    <LoginFormUI
      errorText={errorText}
      onSubmit={handleLogin}
      buttonText='Войти'
      buttonType='submit'
    />
  );
};
