# Проект SkillSwap



## Описание проекта

## Используемый стек технологии
## Структура проекта
## Функциональность
## Установка и запуск проекта
npm install  
npm run dev

## использование скриптов
npm run sync:aliases     Синхронизирует алиасы (aliases.ts) с tsconfig
npm run predev           Синхронизация алиасов перед запуском dev
npm run dev              Запуск Vite dev сервера
npm run build            Компиляция TypeScript + сборка Vite
npm run lint             Проверка кода ESLint
npm run lint:fix         Авто-исправление ошибок ESLint
npm run format           Форматирование кода Prettier
npm run format:check     Проверка кода Prettier
npm run stylelint        Проверка CSS через Stylelint
npm run preview          Просмотр готовой сборки Vite
npm run test             Запуск Jest
npm run storybook        Запуск Storybook с синхронизацией алиасов
npm run storybook:build  Сборка Storybook

## Алиасы

Все алиасы хранятся в aliases.ts в корне проекта.
Пример:
```
import path from 'path';
export const alias = {
  '@': path.resolve(__dirname, 'src')
};
```

Добавление нового алиаса

1. Добавьте запись в aliases.ts:
Пример:
```
'@components': path.resolve(__dirname, 'src/components')
```
2. Запустите синхронизацию:
```
npm run sync:aliases
```
после этих действий Алиасы синхронизируются со всеми файлами где они должны быть прописаны для корректной сборки.

## дополнительная настройка 
Унификация окончания строк (Windows / macOS / Linux)
Чтобы избежать проблем с окончаниями строк и кодировками между разными ОС, в проект добавлен файл .gitattributes.

Убедитесь, что глобально в Git включена авто-конвертация (один раз на машине) запустите в терминале:

macOS / Linux:
  git config --global core.autocrlf input

Windows:
  git config --global core.autocrlf true

потом сделать pull репозитория и выполнить две команды:
  git add --renormalize .
  git commit -m "Normalize line endings according to .gitattributes"