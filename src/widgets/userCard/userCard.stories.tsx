import type { Meta, StoryObj } from '@storybook/react';
import type { TUserCard } from '@/api/types';
import { UserCard } from './userCard';

const mockUser: TUserCard = {
  id: 'user_id_0001',
  name: 'Иван Иванов',
  profileImage: '/db/images/user_0001_full.jpg',
  gender: 'male',
  location: 'Санкт-Петербург',
  birthDate: '01.01.1991',
  bio: 'Привет! Я разработчик и люблю учиться новому'
};

const meta: Meta<typeof UserCard> = {
  title: 'Widgets/UserCard',
  component: UserCard,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: mockUser
  }
};
