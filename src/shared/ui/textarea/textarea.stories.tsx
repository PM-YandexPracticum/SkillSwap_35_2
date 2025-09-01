import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import EditIcon from '@icons/edit.svg';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Shared/UI/Textarea',
  component: Textarea,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// История с возможностью ввода текста (редактируемая)
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: 'Описание',
    placeholder: 'Введите текст...',
    value: '',
    rows: 4
  }
};

// История с иконкой
export const WithIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: 'Описание',
    placeholder: 'Введите текст...',
    icon: <EditIcon />,
    iconStyleOverride: { right: '20px' },
    textareaPadding: { paddingRight: '54px' },
    rows: 4
  }
};
