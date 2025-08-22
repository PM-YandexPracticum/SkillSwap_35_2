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
      options: ['tick', 'minus'],
      description: 'Вид отметки (галочка или минус)'
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
    variant: 'tick'
  }
};
