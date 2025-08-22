import userData from './user.json';
import cardsData from './cards.json';
import categoriesData from './categories.json';
import skillRequests from './skillRequests.json';
import swapsData from './swaps.json';

import type {
  TCategories,
  TSkillRequest,
  TSwap,
  TSkillCard,
  TUser
} from '../../src/api/types';

interface IMockData {
  categories: TCategories[]; // query-запрос в поисковой строке будет подставлять категорию и саб-категорию
  skills: {
    skillsRequests: TSkillRequest[]; // карточки с навыками "Подробнее"
    swaps: TSwap[]; // запросы на обмен
  };
  users: TSkillCard[]; //  список карточек пользователей
  auth: {
    user: TUser;
  }; //  эндпоинты для регистрации, авторизации, выхода и редактирования профиля
  passwordReset: string | null; // эндпоинт для формы восстановления/сброса пароля, пока зашлушка
}

export const mockData: IMockData = {
  categories: categoriesData,
  skills: {
    skillsRequests: skillRequests,
    swaps: swapsData
  },
  users: cardsData,
  auth: {
    user: userData
  },
  passwordReset: null
};
