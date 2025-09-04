import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputText, InputEmail, InputPassword } from './input';

const meta: Meta<typeof Input> = {
  title: 'Shared/UI/Input',
  component: Input,
  tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Введите имя',
    label: 'Имя'
  }
};

export const withError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Введите email',
    error: 'Неверный email'
  }
};

export const TextVariant: Story = {
  render: () => <InputText label='Имя' placeholder='Введите имя' />
};

export const EmailVariant: Story = {
  render: () => <InputEmail label='Email' placeholder='Введите email' />
};

export const PasswordVariant: Story = {
  render: () => <InputPassword label='Password' placeholder='Введите Пароль' />
};
