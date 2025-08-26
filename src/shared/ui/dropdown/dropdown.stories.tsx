// src/shared/ui/dropdown/Dropdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown';
import { 
  genderOptions, 
  cityOptions, 
  categoryOptions,
  gender,
  cities 
} from './dropdownConstants';

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['select', 'searchable', 'multiple'],
      description: 'Тип dropdown',
    },
    value: {
      control: 'text',
      description: 'Выбранное значение',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения',
    },
    error: {
      control: 'boolean',
      description: 'Состояние ошибки',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Базовый dropdown
export const Basic: Story = {
  args: {
    options: genderOptions,
    placeholder: 'Выберите опцию',
    title: 'Базовый выбор',
  },
};

// 2. Dropdown с ошибкой
export const WithError: Story = {
  args: {
    options: genderOptions,
    placeholder: 'Выберите пол',
    title: 'Пол',
    error: true,
    helperMessage: 'Обязательное поле',
  },
};

// 3. Select тип (одиночный выбор)
export const SelectType: Story = {
  args: {
    type: 'select',
    options: genderOptions,
    placeholder: 'Выберите пол',
    title: 'Пол',
    value: gender,
  },
};

// 4. Searchable тип (поисковый)
export const SearchableType: Story = {
  args: {
    type: 'searchable',
    options: cityOptions,
    placeholder: 'Начните вводить город',
    title: 'Город',
    value: cities,
  },
};

// 5. Multiple тип (множественный выбор)
export const MultipleType: Story = {
  args: {
    type: 'multiple',
    options: categoryOptions,
    placeholder: 'Выберите категории',
    title: 'Категории',
    value: ['design', 'programming'],
  },
};

// 6. Все типы вместе (демонстрация)
export const AllTypesShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <Dropdown
        type="select"
        options={genderOptions}
        placeholder="Выберите пол"
        title="Пол (select)"
        value={gender}
      />
      <Dropdown
        type="searchable"
        options={cityOptions}
        placeholder="Начните вводить город"
        title="Город (searchable)"
        value={cities}
      />
      <Dropdown
        type="multiple"
        options={categoryOptions}
        placeholder="Выберите категории"
        title="Категории (multiple)"
        value={['design', 'marketing']}
      />
    </div>
  ),
};