// Dropdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown';

const meta = {
	title: 'UI/Dropdown',
	component: Dropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Простейшие данные прямо в файле
const simpleOptions = [
	{ value: '1', label: 'Опция 1' },
	{ value: '2', label: 'Опция 2' },
	{ value: '3', label: 'Опция 3' },
];

export const Basic: Story = {
	args: {
		options: simpleOptions,
		placeholder: 'Выберите опцию',
	},
};

export const WithTitle: Story = {
	args: {
		options: simpleOptions,
		placeholder: 'Выберите опцию',
		title: 'Заголовок поля',
	},
};

export const WithError: Story = {
	args: {
		options: simpleOptions,
		placeholder: 'Выберите опцию',
		error: true,
		helperMessage: 'Обязательное поле',
	},
};
