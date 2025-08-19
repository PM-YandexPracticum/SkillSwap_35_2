import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeUI } from './badge';

const meta = {
  title: 'Shared/UI/Badge',
  component: BadgeUI,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: [
        'Бизнес и карьера',
        'Творчество и искусство',
        'Иностранные языки',
        'Образование и развитие',
        'Дом и уют',
        'Здоровье и лайфстайл',
        '+'
      ],
      description: 'Категория навыка'
    },
    title: {
      control: 'text',
      description: 'Название навыка'
    }
  }
} satisfies Meta<typeof BadgeUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Business: Story = {
  args: {
    category: 'Бизнес и карьера',
    title: 'Бизнес-план'
  }
};
