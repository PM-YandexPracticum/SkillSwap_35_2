import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Logo } from './logo';

const meta: Meta<typeof Logo> = {
  title: 'Shared/UI/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    withLink: {
      control: 'boolean',
      description: 'Делает логотип ссылкой на главную страницу'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Logo>;
const Template = (args: any) => (
  <BrowserRouter>
    <Logo {...args} />
  </BrowserRouter>
);

export const Default: Story = {
  render: Template,
  args: {
    withLink: false
  }
};
export const WithLink: Story = {
  render: Template,
  args: {
    withLink: true
  }
};
