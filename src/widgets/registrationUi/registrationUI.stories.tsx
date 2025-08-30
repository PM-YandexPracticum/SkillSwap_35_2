import type { Meta, StoryObj } from '@storybook/react';
import image from '../../shared/assets/images/light-bulb.svg/?url';
import { RegistrationUI } from './registrationUI';

const meta: Meta<typeof RegistrationUI> = {
  title: 'Widgets/RegistrationUI',
  component: RegistrationUI,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок для боковой панели'
    },
    description: {
      control: 'text',
      description: 'Описание под заголовком'
    },
    imageSrc: {
      control: 'text',
      description: 'URL изображения'
    },
    children: {
      control: 'text',
      description: 'Контент для левой части'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RegistrationUI>;

export const Default: Story = {
  args: {
    imageSrc: image,
    title: 'Добро пожаловать в SkillSwap!',
    description:
      'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
    children: (
      <div>
        <h3>Здесь будет форма, переданная в children</h3>
      </div>
    )
  }
};
