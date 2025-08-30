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

/*
// регистрация
export const registerUserApi = (data: TRegisterData): Promise<TAuthResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // проверяем, есть ли такой пользователь среди зарегистрированных
      const isExist = users.some((u) => u.email === data.email);

      if (isExist) {
        return reject({
          success: false,
          message: 'Пользователь уже существует'
        });
      }

      // заполняем поля для нового пользователя из data
      const newUser: TUser = {
        email: data.email,
        password: data.password,
        name: data.name,
        avatar: data.avatar,
        birthDate: data.birthDate,
        gender: data.gender,
        city: data.city,
        wantToLearn: data.wantToLearn,
        skill: {
          title: data.title,
          category: data.category,
          subcategory: data.subcategory,
          description: data.description
        }
      };

      // добавляем пользователя в массив пользователей
      users.push(newUser);

      setCookie('accessToken', mockAccessToken);
      localStorage.setItem('refreshToken', mockRefreshToken);

      return resolve({
        success: true,
        refreshToken: mockRefreshToken,
        accessToken: mockAccessToken,
        user: user
      });
    }, 800);
  });
*/
