import type { Meta, StoryObj } from '@storybook/react';
import { LikeButtonUI } from './likeButton';

const meta = {
  title: 'Shared/UI/LikeButton',
  component: LikeButtonUI,
  tags: ['autodocs']
} satisfies Meta<typeof LikeButtonUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Liked: Story = {
  args: {
    liked: true,
    onClick: (evt) => {}
  }
};

export const UnLiked: Story = {
  args: {
    liked: false,
    onClick: (evt) => {}
  }
};
