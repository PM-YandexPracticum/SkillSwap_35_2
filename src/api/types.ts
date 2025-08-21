// категория
export type TCategories = {
  categoryId: number;
  title: string;
  subcategories: TSubcategories[];
};

// сабкатегория
export type TSubcategories = {
  subcagegoryId: number;
  title: string;
};

// поле карточки
export type TSkill = {
  skillName: string; // подставляется в бейдж
  categoryId: number; // для подстановки цвета бейджа и поиска по фильтру
  subcategoryId: number; // для поиска по фильтру
};

// карточка навыка
export type TSkillCard = {
  skillId: string; // ид карточки
  skill: TSkill; // название, категория и подкатегория(сопоставление по id)
  wantTolearn: TSubcategories[]; // навыки для обучения
  skillOwner: TUserCard; // объект с владельцем
  requestStatus: string; // статус обмена: нет/отправлен запрос/одобрен запрос/отклонен запрос
  favorite: boolean; // 2 состояния кнопки лайка
  likeOwner: string[]; //будем искать себя среди лайкнувших, чтобы выводить в меню "Избранное" как в "Место"
  createdAt: string; // дата создания в формате iso, Z в конце указывает часовой пояс UTC(+00)
  updatedAt: string; // обновление карточки навыка, оба поля нужны для related выдачи
};

// карточка навыка в "Подробнее"
export type TSkillRequest = TSkillCard & {
  description: string;
  images: string[]; // стоит подумать об ограничении галереи или заглушках, если пользователь на загрузит фото
};

// профиль пользователя для карточки
export type TUserCard = {
  id: string;
  name: string; // имя пользователя
  profileImage: string; // фото профиля
  gender: string; // пол
  location: string; // город
  birthDate: string; // дата рождения
};

// тип данных для обмена, когда пользователь нажал на кнопку "Предложить обмен"
export type TSwap = TSkillRequest & {
  swapOwner: string; // id предложившего обмен
  swapId: string; // айди для обмена, можно присваивать с помощью uuid
  swapDate: string; // нужен для показа даты запроса в уведомлениях или запросах в ЛК, метка timestamp
};

// профиль пользователя в личном кабинете
export type TUser = TUserCard & {
  description: string;
  email: string;
};

// первый экран регистрации
export type TRegisterLogin = {
  email: string;
  password: string;
};

// второй экран регистрации
export type TRegisterUser = TUserCard & {
  wantTolearn: TSubcategories[];
};

// третий экран регистрации
export type TRegisterSkill = TSkill & TSkillRequest;

// все данные для регистрации собираем по нескольким формам
export type TRegisterData = TRegisterLogin & TRegisterUser & TRegisterSkill;
