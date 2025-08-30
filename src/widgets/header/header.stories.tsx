// header.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'widgets/Header',
  component: Header,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  argTypes: {
    isAuth: { control: 'boolean', description: 'Пользователь авторизован' },
    isFormOpen: { control: 'boolean', description: 'Открыта форма' },
    isFiltered: { control: 'boolean', description: 'Фильтр включен' },
    hasNewNotifications: {
      control: 'boolean',
      description: 'Есть новые уведомления'
    },
    isFavorites: {
      control: 'boolean',
      description: 'Состояние избранного'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    isAuth: false,
    isFormOpen: false,
    isFiltered: false,
    hasNewNotifications: false,
    isFavorites: false
  }
};

export const AuthDefault: Story = {
  args: {
    isAuth: true,
    isFormOpen: false,
    isFiltered: false,
    hasNewNotifications: false,
    isFavorites: false
  }
};

export const AuthWithNotifications: Story = {
  args: {
    isAuth: true,
    isFormOpen: false,
    isFiltered: false,
    hasNewNotifications: true,
    isFavorites: false
  }
};

export const AuthFavorites: Story = {
  args: {
    isAuth: true,
    isFormOpen: false,
    isFiltered: false,
    hasNewNotifications: false,
    isFavorites: true
  }
};

export const FormOpen: Story = {
  args: {
    isAuth: true,
    isFormOpen: true,
    isFiltered: false,
    hasNewNotifications: false,
    isFavorites: false
  }
};

export const FilteredNotAuth: Story = {
  args: {
    isAuth: false,
    isFormOpen: false,
    isFiltered: true,
    hasNewNotifications: false,
    isFavorites: false
  }
};
