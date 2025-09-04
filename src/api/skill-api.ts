import categories from '../../public/db/categories.json'; // категории и сабкатегории
import skills from '../../public/db/skills.json'; // все навыки
import user from '../../public/db/user.json'; // профиль пользователя
import users from '../../public/db/users.json'; // все профили пользователей

import { setCookie, getCookie, deleteCookie } from '../shared/lib/cookie';
import type {
  TCategories,
  TSkill,
  TUser
  /*
  TRegisterLogin,
  TRegisterUser,
  TRegisterSkill,
  TRegisterData
  */
} from './types';

const mockAccessToken = 'mock_access_token_123';
const mockRefreshToken = 'mock_refresh_token_456';

export type TCategoriesResponse = {
  success: boolean;
  data: TCategories[];
};

// получение списка категорий и подкатегорий
export const getCategoriesApi = (): Promise<TCategoriesResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: categories
      });
    }, 1500);
  });

export type TSkillsResponse = {
  success: boolean;
  data: TSkill[];
  total: number;
};

export const getSkillsApi = (): Promise<TSkillsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: skills,
        total: skills.length
      });
    }, 1500);
  });

// получение пользователя по токену
export const getUserApi = (): Promise<TUser> => {
  const accessToken = getCookie('accessToken');

  // ! Временно подставляет моковые токены
  if (!accessToken) {
    setCookie('accessToken', mockAccessToken);
    localStorage.setItem('refreshToken', mockRefreshToken);
  }

  return new Promise<TUser>((resolve, reject) => {
    setTimeout(() => {
      if (!accessToken) {
        reject({ success: false, message: 'Не авторизован' });
        return;
      }
      resolve(user);
    }, 500);
  });
};

export type TAuthResponse = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
  user: TUser;
};

export type TLoginData = {
  email: string;
  password: string;
};

export const checkEmailApi = (email: string): Promise<boolean> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const exists = users.some((user) => user.email === email);
      resolve(exists);
    }, 150);
  });

export const loginUserApi = (data: TLoginData): Promise<TAuthResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (!user) {
        return reject({
          success: false,
          message:
            'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных'
        });
      }

      //! Временно подставляем моковые токены
      setCookie('accessToken', mockAccessToken);
      localStorage.setItem('refreshToken', mockRefreshToken);

      const authResponse: TAuthResponse = {
        success: true,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        user: user
      };

      resolve(authResponse);
    }, 800);
  });

// выход - удаляем токены и пользователя
export const logoutApi = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      resolve({
        success: true,
        user: ''
      });
    }, 800);
  });

export type TUsersResponse = {
  success: boolean;
  data: TUser[];
};

// получает список всех пользователей
export const getUsersApi = (): Promise<TUsersResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: users
      });
    }, 1000);
  });

// регистрация - сохраняет нового пользователя в локальном хранилище
export const registerUserApi = (data: TUser): Promise<TAuthResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      //! Временно подставляем моковые токены
      setCookie('accessToken', mockAccessToken);
      localStorage.setItem('refreshToken', mockRefreshToken);

      return resolve({
        success: true,
        refreshToken: mockRefreshToken,
        accessToken: mockAccessToken,
        user: data
      });
    }, 800);
  });

// регистрация - сохраняет новый навык в локальном хранилище
export const registerSkillApi = (data: TSkill): Promise<TSkill> =>
  new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('currentSkill', JSON.stringify(data));
      return resolve(data);
    }, 1000);
  });
