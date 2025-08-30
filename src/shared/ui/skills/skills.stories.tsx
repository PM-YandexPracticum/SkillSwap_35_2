import type { Meta, StoryObj } from '@storybook/react';
import Skills from './skills';

const meta: Meta<typeof Skills> = {
  title: 'Shared/UI/Skills',
  component: Skills,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Открыт ли список навыков'
    },
    onClose: { action: 'closed' }
  }
};

export default meta;
type Story = StoryObj<typeof Skills>;

export const Default: Story = {
  args: {
    isOpen: true
  }
};

export const Closed: Story = {
  args: {
    isOpen: false
  }
};
