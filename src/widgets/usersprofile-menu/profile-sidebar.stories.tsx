import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ProfileSidebar } from './profile-sidebar';

const meta: Meta<typeof ProfileSidebar> = {
  title: 'Components/ProfileSidebar',
  component: ProfileSidebar,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    )
  ],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ProfileSidebar>;

export const Default: Story = {};

export const ActiveRequests: Story = {
  parameters: {
    reactRouter: {
      routePath: '/requests',
      currentPath: '/requests'
    }
  }
};

export const ActiveFavourites: Story = {
  parameters: {
    reactRouter: {
      routePath: '/favourites',
      currentPath: '/favourites'
    }
  }
};

export const ActiveProfile: Story = {
  parameters: {
    reactRouter: {
      routePath: '/profile',
      currentPath: '/profile'
    }
  }
};
