import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../../app/store/store';
import { CardsPage } from './CardsPage';

const meta: Meta<typeof CardsPage> = {
  title: 'Pages/CardsPage',
  component: CardsPage,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ padding: 20 }}>
          <Story />
        </div>
      </Provider>
    )
  ]
};
export default meta;

type Story = StoryObj<typeof CardsPage>;

export const DefaultPage: Story = {
  args: { viewMode: 'default' }
};

export const PopularPage: Story = {
  args: { viewMode: 'popular' }
};

export const NewPage: Story = {
  args: { viewMode: 'new' }
};
