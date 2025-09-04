// категория
export type TCategories = {
  categoryId: number;
  title: string;
  subcategories: TSubcategories[];
};

// сабкатегория
export type TSubcategories = {
  subcategoryId: number;
  title: string;
};

// поле карточки
export type TSkillInfo = {
  skillName: string; // подставляется в бейдж
  categoryId: number; // для подстановки цвета бейджа и поиска по фильтру
  subcategoryId: number; // для поиска по фильтру
};

export type TSkill = {
  skillId: string; // айди карточки
  canTeach: TSkillInfo; // название навыка + привязка к категории для цвета бейджа и фильтрации
  wantToLearn: TSubcategories[]; // хочет изучать - список сабкатегорий
  skillOwner: TUserCard; // владелец навыка, разные враианты отображения в навыке и в карточке, но суть одна
  requestStatus: string; // статус обмена (нет статуса/ предложен обмен/ отменен обмен/ одобрен обмен)
  images: string[]; // галерея картинок навыка
  description: string; // описание навыка
  favorite: {
    likeStatus: boolean; // статус лайка
    likeOwners: string[]; // массив владельцев лайков
  };
  updatedAt: string; // когда карточка создана/обновлена
  swapOwner: string | null; // кто предложил обмен
  swapDate: string | null; // дата предложения обмена для тост-уведомления и статус бара уведомлений
};

// профиль пользователя для карточки
export type TUserCard = {
  id: string;
  name: string; // имя пользователя
  profileImage: string; // фото профиля
  gender: string; // пол
  location: string; // город
  birthDate: string; // дата рождения
  bio: string; // описание
};

// профиль пользователя в личном кабинете
export type TUser = TUserCard & {
  email: string;
  password: string;
};

// первый экран регистрации
export type TRegisterLogin = {
  email: string;
  password: string;
};

// второй экран регистрации
export type TRegisterUser = {
  profileImage: string;
  name: string;
  birthDate: string;
  gender: string;
  location: string;
  wantToLearn: TSubcategories[];
};

// третий экран регистрации
export type TRegisterSkill = {
  canTeach: TSkillInfo;
  images: string[];
  description: string;
};

// все данные для регистрации собираем по нескольким формам
export type TRegisterData = TRegisterLogin & TRegisterUser & TRegisterSkill;
