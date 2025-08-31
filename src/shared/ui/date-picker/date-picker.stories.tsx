import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Shared/UI/DatePicker',
  component: DatePicker,
  argTypes: {
    onChange: { action: 'date changed' }
  }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Базовый пример без начального значения
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        value={date}
        onChange={(d) => {
          setDate(d);
          console.log('selected date:', d);
        }}
      />
    );
  }
};

// Пример с изначальным значением
export const WithInitialValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(1990, 0, 1));
    return (
      <DatePicker
        value={date}
        onChange={(d) => {
          setDate(d);
          console.log('selected date:', d);
        }}
      />
    );
  }
};
