import type { Meta, StoryObj } from '@storybook/react';
import { ModalUI } from './modal';

const meta = {
  title: 'Shared/UI/Modal',
  component: ModalUI,
  tags: ['autodocs']
} satisfies Meta<typeof ModalUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalUISwap: Story = {
  args: {
    title: 'Ваше предложение',
    description: 'Пожалуйста, проверьте и подтвердите правильность данных',
    mode: 'dialog',
    zIndex: 10,
    onClose: () => {},
    children: 'Встраиваемое содержимое компонента'
  }
};

export const ModalUIOther: Story = {
  args: {
    title: '',
    description: '',
    mode: 'dialog',
    zIndex: 10,
    onClose: () => {},
    children: 'Встраиваемое содержимое компонента'
  }
};

export const ModalUILogin: Story = {
  args: {
    title: '',
    description: '',
    mode: 'fullscreen',
    zIndex: 10,
    onClose: () => {},
    children: 'Встраиваемое содержимое компонента'
  }
};
