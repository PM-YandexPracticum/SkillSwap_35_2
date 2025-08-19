import type { Meta, StoryObj } from '@storybook/react';
import { ModalUI } from './modal';

const meta = {
  title: 'Shared/UI',
  component: ModalUI,
  tags: ['autodocs']
} satisfies Meta<typeof ModalUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalUISwap: Story = {
  args: {
    title: 'Ваше предложение',
    description: 'Пожалуйста, проверьте и подтвердите правильность данных',
    onClose: () => {},
    children: 'Встраиваемое содержимое компонента'
  }
};

export const ModalUIOther: Story = {
  args: {
    title: '',
    description: '',
    onClose: () => {},
    children: 'Встраиваемое содержимое компонента'
  }
};
