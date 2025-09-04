import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import type { TSkill } from '@/api/types';
import { categoriesSlice } from '@/entities/categories/categories-slice';
import { UserCard } from './userCard';

const mockStore = configureStore({
  reducer: {
    categories: categoriesSlice.reducer
  },
  preloadedState: {
    categories: {
      isLoading: false,
      error: null,
      categories: []
    }
  }
});

const mockSkill: TSkill = {
  skillId: 'skill_id_0001',
  canTeach: {
    skillName: 'Игра на барабанах',
    categoryId: 4,
    subcategoryId: 43
  },
  wantToLearn: [
    {
      subcategoryId: 16,
      title: 'Тайм менеджмент'
    },
    {
      subcategoryId: 35,
      title: 'Ремонт'
    },
    {
      subcategoryId: 61,
      title: 'Йога и медитация'
    }
  ],
  skillOwner: {
    id: 'user_id_0001',
    name: 'Иван',
    profileImage: '/db/images/user_0001_full.jpg',
    gender: 'male',
    location: 'Санкт-Петербург',
    birthDate: '1991-01-01',
    bio: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое'
  },
  requestStatus: 'none',
  images: [
    '/db/images/swap_01-1.jpg',
    '/db/images/swap_01-2.jpg',
    '/db/images/swap_01-3.jpg',
    '/db/images/swap_01-4.jpg'
  ],
  description:
    'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
  favorite: {
    likeStatus: false,
    likeOwners: []
  },
  updatedAt: '2025-08-01T14:47:21.979Z',
  swapOwner: null,
  swapDate: null
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
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Compact: Story = {
  args: {
    skill: mockSkill,
    variant: 'compact'
  }
};

export const Detailed: Story = {
  args: {
    skill: mockSkill,
    variant: 'detailed'
  }
};
