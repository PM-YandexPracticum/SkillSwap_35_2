// DatePicker.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Shared/UI/DatePicker',
  component: DatePicker
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

// ---------- История 1: По умолчанию ----------
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div style={{ padding: 20, maxWidth: 300 }}>
        <DatePicker value={date} onChange={setDate} />
        <p style={{ marginTop: 10 }}>
          Выбранная дата: {date ? date.toLocaleDateString('ru-RU') : '—'}
        </p>
      </div>
    );
  }
};

// ---------- История 2: С предустановленной датой ----------
export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date('1990-01-01'));

    return (
      <div style={{ padding: 20, maxWidth: 300 }}>
        <DatePicker value={date} onChange={setDate} />
        <p style={{ marginTop: 10 }}>
          Выбранная дата: {date.toLocaleDateString('ru-RU')}
        </p>
      </div>
    );
  }
};

// ---------- История 3: Календарь открытый по умолчанию ----------
export const OpenByDefault: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const [isOpen, setIsOpen] = useState(true); // откроем календарь сразу

    return (
      <div style={{ padding: 20, maxWidth: 300 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          // Если нужно, можно изменить компонент, чтобы принимать проп isOpen
        />
        <p style={{ marginTop: 10 }}>
          Выбранная дата: {date ? date.toLocaleDateString('ru-RU') : '—'}
        </p>
      </div>
    );
  }
};
