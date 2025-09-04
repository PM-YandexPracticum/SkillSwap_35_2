import categories from './categories.json';
import skills from './skills.json';
import users from './users.json';

import type {
  TCategories,
  TSkill,
  TUser
} from '../../src/api/types';

interface IMockData {
  categories: TCategories[]; // список категорий и подкатегорий
  skills: TSkill[]; // список навыков
  users: TUser[]; // список пользователей
}

export const mockData: IMockData = {
  categories: categories,
  skills: skills,
  users: users
};
