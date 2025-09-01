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

// ---------- Default story ----------
export const Default: Story = {
  render: () => {
    // Состояние хранит строку в формате YYYY-MM-DD
    const [dateStr, setDateStr] = useState<string | undefined>(undefined);

    return (
      <DatePicker
        value={dateStr} // передаём строку или undefined
        onChange={(d) => {
          setDateStr(d); // получаем строку обратно
          console.log('selected date:', d);
        }}
      />
    );
  }
};

// ---------- Story с начальным значением ----------
export const WithInitialValue: Story = {
  render: () => {
    const [dateStr, setDateStr] = useState<string | undefined>('1990-01-01');

    return (
      <DatePicker
        value={dateStr} // передаём строку
        onChange={(d) => {
          setDateStr(d); // обновляем строку при выборе
          console.log('selected date:', d);
        }}
      />
    );
  }
};
