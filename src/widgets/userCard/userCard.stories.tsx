import type { Meta, StoryObj } from '@storybook/react';
import type { TUser } from '@/api/types';
import { UserCard } from './userCard';

const mockUser: TUser = {
  id: 'user_id_0001',
  name: 'Иван Иванов',
  profileImage: '/db/images/user_0001_full.jpg',
  gender: 'male',
  location: 'Санкт-Петербург',
  birthDate: '01.01.1991',
  bio: 'Привет! Я разработчик и люблю учиться новому',
  email: '',
  password: ''
};

const meta: Meta<typeof UserCard> = {
  title: 'Widgets/UserCard',
  component: UserCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['compact', 'detailed'],
      description: 'Вариант отображения карточки'
    }
  }
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Compact: Story = {
  args: {
    user: mockUser,
    variant: 'compact'
  }
};

export const Detailed: Story = {
  args: {
    user: mockUser,
    variant: 'detailed'
  }
};
