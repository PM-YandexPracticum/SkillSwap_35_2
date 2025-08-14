import React from 'react'; 
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

// Метаданные компонента
const meta: Meta<typeof Button> = {
  title: 'Shared/UI/Button', // Путь в сторибуке
  component: Button,
  tags: ['autodocs'], // Автоматическая генерация документации
  argTypes: {
    buttonType: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Тип кнопки',
    },
    text: {
      control: 'text',
      description: 'Текст кнопки',
    },
    icon: {
      control: 'object',
      description: 'React-нода иконки',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Позиция иконки относительно текста',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled',
    },
    onClick: { 
      action: 'clicked',
      description: 'Обработчик клика',
    },
  },
};

export default meta;

// Базовый шаблон
type Story = StoryObj<typeof Button>;

// Основные истории
export const Primary: Story = {
  args: {
    buttonType: 'primary',
    text: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
    text: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    buttonType: 'tertiary',
    text: 'Tertiary Button',
  },
};

export const WithIconLeft: Story = {
  args: {
    buttonType: 'primary',
    text: 'Button with Icon',
    icon: '★',
    iconPosition: 'left',
  },
};

export const WithIconRight: Story = {
  args: {
    buttonType: 'primary',
    text: 'Button with Icon',
    icon: '★',
    iconPosition: 'right',
  },
};

export const Disabled: Story = {
  args: {
    buttonType: 'primary',
    text: 'Disabled Button',
    disabled: true,
  },
};