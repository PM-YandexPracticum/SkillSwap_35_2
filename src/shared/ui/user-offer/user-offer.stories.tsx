import type { Meta, StoryObj } from '@storybook/react';
import { UserOfferUI } from './user-offer';

const meta = {
  title: 'Shared/UI/user-offer',
  component: UserOfferUI,
  tags: ['autodocs'],
  argTypes: {
    requestStatus: {
      control: 'select',
      options: ['none', 'sended', 'rejected', 'approved']
    }
  }
} satisfies Meta<typeof UserOfferUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultUserOffer: Story = {
  args: {
    skillName: 'Игра на барабанах',
    categoryName: 'Творчество и искусство',
    subcategoryName: 'Видеомонтаж',
    description:
      'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
    images: [
      '/db/images/swap_01-1.jpg',
      '/db/images/swap_01-2.jpg',
      '/db/images/swap_01-3.jpg',
      '/db/images/swap_01-4.jpg',
      '/db/images/user_0001_full.jpg'
    ],
    requestStatus: 'none',
    justAdded: false,
    isLiked: false,
    setIsLiked: () => {},
    onClick: (_e: React.MouseEvent<HTMLButtonElement>) => {}
  }
};
