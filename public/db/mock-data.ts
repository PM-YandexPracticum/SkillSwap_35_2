import userData from './user.json';
import usersData from './users.json';
import skillsData from './skills.json';
import swapData from './swap.json';

// список навыков для категорий и выпадашек
type TSkill = {
  category: string;
  subcategory: string[];
};

// поле с названием навыка, которое дает ему пользователь
type TUserSkill = TSkill & {
  skillName: string;
};

// карточка навыка в "Подробнее"
type TSwap = {
  swapId: string; // ид карточки
  name: string; // пользователь сам называет свой навык, который относится к категории и сабкатегории
  category: string;
  subcategory: string;
  description: string;
  images: string[]; // стоит подумать об ограничении галереи или заглушках, если пользователь на загрузит фото
  requestOwner: TUserSwap; // id создавшего карточку с предложением об обмене
  requestStatus: TRequestStatus; // статус обмена: нет/отправлен запрос/одобрен запрос/отклонен запрос
  favorite: boolean; // 2 состояния кнопки лайка
  likeOwner: string[]; //будем искать себя среди лайкнувших, чтобы выводить в меню "Избранное" как в "Место"
  createdAt: string; // дата создания в формате iso, Z в конце указывает часовой пояс UTC(+00)
  updatedAt: string; // обновление карточки навыка
};

// тип поля requestStatus имеет одно из значений и по нему устанавливаться данные для кнопки
type TRequestStatus = 'none' | 'requested' | 'ok' | 'decline';

// тип карточки для обмена, когда пользователь нажал на кнопку "Предложить обмен"
type TSwapRequest = TSwap & {
  requestRecipient: string; // цель обмена
  requestId: string; // айди для реквеста, можно присваивать с помощью uuid
  requestDate: string; // нужен для показа даты запроса в уведомлениях или запросах в ЛК, метка timestamp
};

// профиль пользователя в личном кабинете
type TUser = {
  id: string;
  name: string;
  dateOfBirth: string; // TODO нужна библиотеки для рассчета возраста и склонения слова "лет". В ЛК возраст не указан, он нужен для карточки
  gender: string;
  city: string;
  description: string;
  profileImage_mobile: string;
  profileImage_full: string;
  email: string;
};

// карточка пользователя в галерее
type TUserGallery = Pick<
  TUser,
  'id' | 'profileImage_mobile' | 'name' | 'city' | 'dateOfBirth'
> &
  Pick<TSwap, 'favorite' | 'likeOwner' | 'swapId'> & {
    requiredSkill: TUserSkill; // навык, которому МОЖЕТ научить: название пользовательское, цвет бейджа по категории
    proposedSkill: TSkill[]; // навык, которому ХОЧЕТ научиться, текстовое содержимое по сабкатегории, основная категория предполагает подбор цвет бейджа
  };

// карточка пользователя в свапе(меняется изображение и добавляется описание)
type TUserSwap = Pick<
  TUser,
  'id' | 'profileImage_full' | 'name' | 'city' | 'dateOfBirth' | 'description'
> & {
  requiredSkill: TUserSkill;
  proposedSkill: TSkill[];
};

interface IMockData {
  skills: TSkill[]; //  query-запрос в поисковой строке будет подставлять категорию и саб-категорию
  swap: TSwap[]; //  карточка для обмена, ищется по id(по аналогии с заказом из бургерной)
  users: TUserGallery[]; //  список пользователей, поиск тоже осуществляется по id
  auth: {
    user: TUser;
  }; //  эндпоинты для регистрации, авторизации, выхода и редактирования профиля
  passwordReset: string | null; // эндпоинт для формы восстановления/сброса пароля, пока зашлушка
}

export const mockData: IMockData = {
  skills: skillsData,
  swap: swapData as TSwap[],
  users: usersData,
  auth: {
    user: userData
  },
  passwordReset: null
};
