import type { Meta, StoryObj } from '@storybook/react';
import { TitleUI } from './title';

const meta = {
  title: 'Shared/UI/Title',
  component: TitleUI,
  tags: ['autodocs']
} satisfies Meta<typeof TitleUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleH1: Story = {
  args: {
    size: 'h1',
    text: 'Загловок H1'
  }
};

export const TitleH2: Story = {
  args: {
    size: 'h2',
    text: 'Загловок H2'
  }
};

export const TitleH3: Story = {
  args: {
    size: 'h3',
    text: 'Загловок H3'
  }
};

export const TitleH4: Story = {
  args: {
    size: 'h4',
    text: 'Загловок H4'
  }
};
