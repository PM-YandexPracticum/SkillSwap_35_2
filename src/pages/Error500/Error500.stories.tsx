import type { Meta } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Error500 } from './Error500';

const meta = {
  title: 'pages/Error500',
  component: Error500,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Error500>;

export default meta;

export const Error = () => (
  <MemoryRouter>
    <Error500 />
  </MemoryRouter>
);
