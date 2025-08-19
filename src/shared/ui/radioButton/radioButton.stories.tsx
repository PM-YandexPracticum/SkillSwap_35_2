import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioButton } from './radioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Shared/UI/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' }
  },
  args: {
    name: 'radio-group' // Обязательное поле
  }
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// Базовые истории
export const Checked: Story = {
  args: {
    label: 'Выбранный вариант',
    value: 'opt1',
    checked: true
  }
};

export const Unchecked: Story = {
  args: {
    label: 'Невыбранный вариант',
    value: 'opt2',
    checked: false
  }
};

// Пример группы
export const GroupExample = () => {
  const [value, setValue] = React.useState('opt1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <RadioButton
        label='Вариант 1'
        value='opt1'
        name='group'
        checked={value === 'opt1'}
        onChange={setValue}
      />
      <RadioButton
        label='Вариант 2'
        value='opt2'
        name='group'
        checked={value === 'opt2'}
        onChange={setValue}
      />
    </div>
  );
};
