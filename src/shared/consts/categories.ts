import business from '../assets/icons/business.svg?url';
import creation from '../assets/icons/creation.svg?url';
import education from '../assets/icons/education.svg?url';
import health from '../assets/icons/health.svg?url';
import homeSkill from '../assets/icons/home-skill.svg?url';
import languages from '../assets/icons/languages.svg?url';

export const SKILL_CATEGORIES = {
  business: {
    label: 'Бизнес и карьера',
    color: '#EEE7F7',
    icon: business,
    skills: [
      'Управление командой',
      'Маркетинг и реклама',
      'Продажи и переговоры',
      'Личный бренд',
      'Резюме и собеседование',
      'Тайм-менеджмент',
      'Проектное управление',
      'Предпринимательство'
    ]
  },
  creation: {
    label: 'Творчество и искусство',
    color: '#F7E7F2',
    icon: creation,
    skills: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY'
    ]
  },
  languages: {
    label: 'Иностранные языки',
    color: '#EBE5C5',
    icon: languages,
    skills: [
      'Английский',
      'Французский',
      'Испанский',
      'Немецкий',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)'
    ]
  },
  education: {
    label: 'Образование и развитие',
    color: '#E7F2F6',
    icon: education,
    skills: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг'
    ]
  },
  house: {
    label: 'Дом и уют',
    color: '#F7EBE5',
    icon: homeSkill,
    skills: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей'
    ]
  },
  health: {
    label: 'Здоровье и лайфстайл',
    color: '#E9F7E7',
    icon: health,
    skills: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы'
    ]
  }
} as const;

export type TSkillCategory = keyof typeof SKILL_CATEGORIES;
