// panel-filters.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PanelFilters } from './panel-filters';

const meta = {
  title: 'Widgets/PanelFilters',
  component: PanelFilters,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    onFiltersChange: { action: 'filtersChanged' },
    className: { control: 'text' }
  }
} satisfies Meta<typeof PanelFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история - пустые фильтры
export const Default: Story = {
  args: {
    onFiltersChange: (filters) => console.log('Filters changed:', filters)
  }
};

// В контейнере для демонстрации
export const InContainer: Story = {
  args: {
    onFiltersChange: (filters) => console.log('Filters changed:', filters)
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          gap: '24px',
          margin: '0 auto'
        }}
      >
        <Story />
        <div
          style={{
            flex: 1,
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '8px'
          }}
        >
          <h3>Контентная область</h3>
          <p>Здесь будут карточки пользователей</p>
        </div>
      </div>
    )
  ]
};
