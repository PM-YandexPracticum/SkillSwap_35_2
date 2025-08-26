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
    text: 'Заголовок H1'
  }
};

export const TitleH2: Story = {
  args: {
    size: 'h2',
    text: 'Заголовок H2'
  }
};

export const TitleH3: Story = {
  args: {
    size: 'h3',
    text: 'Заголовок H3'
  }
};

export const TitleH4: Story = {
  args: {
    size: 'h4',
    text: 'Заголовок H4'
  }
};

export const TitleWithCustomStyle: Story = {
  args: {
    size: 'h1',
    text: 'Заголовок с кастомным стилем',
    className: 'underline'
  }
};
