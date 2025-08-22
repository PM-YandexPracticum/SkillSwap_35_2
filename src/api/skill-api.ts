import cards from '../../public/db/cards.json'; // карточки
import categories from '../../public/db/categories.json'; // категории и сабкатегории
import skillRequests from '../../public/db/skillRequests.json'; // навыки подробнее по id
import swaps from '../../public/db/swaps.json'; // обмены
import user from '../../public/db/user.json'; // профиль пользователя

import { setCookie, getCookie, deleteCookie } from '../shared/lib/cookie';
import type {
  TCategories,
  TSkillCard,
  TSkillRequest,
  TSwap,
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
const mockLoginData = {
  email: 'ivan@example.ru',
  password: '123456qwerty'
};

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

export type TPagination = {
  page?: number; // номер страницы
  limit?: number; // количество карточек на странице
};

export type TCardsResponse = {
  success: boolean;
  data: TSkillCard[];
  total: number;
};

// получение данных карточек
// без передачи page с бэка - отправляется запрос с аргументами на номер страницы и количество карточек на странице
// вызов для санки getCardsApi({page: (номер страницы), limit: (кол-во карточек)})
export const getCardsApi = (
  pagination: TPagination = {
    page: 1,
    limit: 12
  }
): Promise<TCardsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const { page = 1, limit = 20 } = pagination;
      const start = (page - 1) * limit;
      const end = start + limit;

      resolve({
        success: true,
        data: cards.slice(start, end),
        total: cards.length
      });
    }, 2000);
  });

// related "Популярное" - сортировка по длине массива likeOwner
export const getPopularCardsApi = (): Promise<TCardsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const popularCards = [...cards].sort(
        (a, b) => b.likeOwner.length - a.likeOwner.length
      );
      resolve({
        success: true,
        data: popularCards,
        total: popularCards.length
      });
    }, 350);
  });

// related "Новое" - сортировка updatedAt
export const getNewCardsApi = (): Promise<TCardsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const newCards = [...cards].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      resolve({
        success: true,
        data: newCards,
        total: newCards.length
      });
    }, 350);
  });

// related "Рекомендуем" - аргументом вставляем номер категории, которую ходим показать в выдаче
export const getRecommendedCardsApi = (
  categoryId: number
): Promise<TCardsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const recCards = [...cards].filter(
        (card) => card.skill.categoryId === categoryId
      );
      resolve({
        success: true,
        data: recCards,
        total: recCards.length
      });
    }, 350);
  });

export type TSkillRequestResponse = {
  success: boolean;
  skillRequest: TSkillRequest;
};

// получение навыка по id - не требует доступа к токенам
export const getSkillByIdApi = (
  skillId: string
): Promise<TSkillRequestResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const found =
        (skillRequests as TSkillRequest[]).find((s) => s.skillId === skillId) ||
        null;

      resolve({
        success: !!found,
        skillRequest: found as TSkillRequest
      });
    }, 1500);
  });

export type TSwapResponse = {
  success: boolean;
  swap: TSwap;
};

// получение обмена по id - пользователь должен быть авторизован
export const getSwapByIdApi = (swapId: string): Promise<TSwapResponse> =>
  getUserApi().then(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!user) {
            reject({ success: false, message: 'Not authorized' });
            return;
          }

          const found =
            (swaps as TSwap[]).find((s) => s.swapId === swapId) || null;

          resolve({
            success: !!found,
            swap: found as TSwap
          });
        }, 750);
      })
  );

// у свапов есть владелец карточки и тот, кто предложил обмен - swapOwner
export type TSwapRequestsResponse = {
  success: boolean;
  swaps?: TSwap[];
  message?: string;
};

// у скилов есть только владелец
export type TSkillRequestsResponse = {
  success: boolean;
  skillRequests?: TSkillRequest[];
  message?: string;
};

// ЛК: заявки обмена, доступ через accessToken (status=requested user либо владелец навыка, либо предложил обмен)
export const getUserSwapRequestsApi = (): Promise<TSwap[]> =>
  getUserApi().then((user) =>
    new Promise<TSwapRequestsResponse>((resolve) => {
      setTimeout(() => {
        const result = swaps.filter(
          (s) =>
            s.requestStatus === 'requested' &&
            (s.skillOwner.id === user.id || s.swapOwner === user.id)
        );
        resolve({ success: true, swaps: result });
      }, 1000);
    }).then((data) => (data.success ? data.swaps || [] : Promise.reject(data)))
  );

// ЛК: одобренные обмены (status=ok, user либо владелец навыка, либо предложил обмен)
export const getUserApprovedSwapsApi = (): Promise<TSwap[]> =>
  getUserApi().then((user) =>
    new Promise<TSwapRequestsResponse>((resolve) => {
      setTimeout(() => {
        const result = swaps.filter(
          (s) =>
            s.requestStatus === 'ok' &&
            (s.skillOwner.id === user.id || s.swapOwner === user.id)
        );
        resolve({ success: true, swaps: result });
      }, 1000);
    }).then((data) => (data.success ? data.swaps || [] : Promise.reject(data)))
  );

// ЛК: избранное favorite=true + текущий пользователь есть в likeOwner, поиск в SkillRequests
export const getUserFavoriteSkillsApi = (): Promise<TSkillRequest[]> =>
  getUserApi().then((user) =>
    new Promise<TSkillRequestsResponse>((resolve) => {
      setTimeout(() => {
        const result = (skillRequests as TSkillRequest[]).filter((s) => {
          const likes = (s.likeOwner ?? []) as string[];
          return s.favorite && likes.includes(user.id as string);
        });
        resolve({ success: true, skillRequests: result });
      }, 1000);
    }).then((data) =>
      data.success ? data.skillRequests || [] : Promise.reject(data)
    )
  );

// ЛК: мои навыки (status='none', текущий пользователь = skillOwner, поиск в SkillRequests)
export const getUserMySwapsApi = (): Promise<TSkillRequest[]> =>
  getUserApi().then((user) =>
    new Promise<TSkillRequestsResponse>((resolve) => {
      setTimeout(() => {
        const result = (swaps as TSwap[]).filter(
          (s) => s.requestStatus === 'none' && s.skillOwner.id === user.id
        );

        resolve({ success: true, skillRequests: result });
      }, 1000);
    }).then((data) =>
      data.success ? data.skillRequests || [] : Promise.reject(data)
    )
  );

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
        reject({ success: false, message: 'Not authorized' });
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

// логин пользователя, сравниваем с моковыми данными
export const loginUserApi = (data: TLoginData): Promise<TAuthResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        mockLoginData.email !== data.email &&
        mockLoginData.password !== data.password
      ) {
        return reject({ success: false, message: 'Неверный email или пароль' });
      }

      // ! Временно подставляет моковые токены
      setCookie('accessToken', mockAccessToken);
      localStorage.setItem('refreshToken', mockRefreshToken);

      resolve({
        success: true,
        refreshToken: mockRefreshToken,
        accessToken: mockAccessToken,
        user: user
      });
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
