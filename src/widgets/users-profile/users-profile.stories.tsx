import type { Meta, StoryObj } from '@storybook/react';
import { UsersProfile } from './users-profile';
import { getStoredUserData, saveUserToStorage } from './users-profile';

// Моки для localStorage
const mockUserData = {
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  password: 'password123',
  gender: 'male',
  city: 'Москва',
  description: 'Фронтенд разработчик с опытом работы в React',
  birthDate: '1990-01-15',
  avatar: null
};

// Декоратор для мокирования localStorage
const withLocalStorageMock = (Story: any, { parameters }: any) => {
  // Мокируем localStorage перед рендером
  if (parameters?.userData) {
    localStorage.setItem('user', JSON.stringify(parameters.userData));
  } else {
    localStorage.removeItem('user');
  }

  return <Story />;
};

const meta: Meta<typeof UsersProfile> = {
  title: 'Components/UsersProfile',
  component: UsersProfile,
  decorators: [withLocalStorageMock],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof UsersProfile>;

// История с пустыми данными
export const Empty: Story = {
  parameters: {
    userData: null
  }
};

// История с заполненными данными
export const WithData: Story = {
  parameters: {
    userData: mockUserData
  }
};

// История с частично заполненными данными
export const PartialData: Story = {
  parameters: {
    userData: {
      name: 'Мария Петрова',
      email: 'maria@example.com',
      gender: 'female',
      city: 'Санкт-Петербург',
      description: '',
      birthDate: null,
      avatar: null
    }
  }
};

// История с видимым полем пароля
export const PasswordFieldVisible: Story = {
  parameters: {
    userData: mockUserData
  },
  play: async ({ canvasElement }) => {
    // Ждем загрузки компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Находим кнопку "Изменить пароль" и кликаем
    const passwordButton = canvasElement.querySelector('button');
    if (passwordButton) {
      passwordButton.click();
    }
  }
};

export const WithLongDescription: Story = {
  parameters: {
    userData: {
      ...mockUserData,
      description: ' В свободное время изучаю новые технологии.'
    }
  }
};
