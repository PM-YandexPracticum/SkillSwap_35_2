import type { Meta, StoryObj } from '@storybook/react';
import { DragAndDrop } from './drag-and-drop';

const meta = {
  title: 'Shared/UI/DragAndDrop',
  component: DragAndDrop,
  tags: ['autodocs']
} satisfies Meta<typeof DragAndDrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDragAndDrop: Story = {
  args: {
    onFilesAdded: () => {},
    text: 'Перетащите или выберите изображения навыка',
    buttonText: 'Выбрать изображения'
  }
};
