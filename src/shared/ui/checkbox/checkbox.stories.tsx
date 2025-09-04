import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Shared/UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст рядом с чекбоксом'
    },
    variant: {
      control: 'radio',
      options: ['category', 'subcategory'],
      description:
        'Вид отметки (галочка для категории или минус для подкатегории)'
    },
    checked: {
      control: 'boolean',
      description: 'Выбран ли чекбокс'
    },
    onChange: {
      action: 'changed',
      description: 'Событие при изменении'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxStory: Story = {
  args: {
    label: '',
    name: '',
    value: '',
    checked: false,
    variant: 'category'
  }
};
