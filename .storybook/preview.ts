import type { Preview } from '@storybook/react-vite';
import '../src/app/styles/globals.scss';

const customViewports = {
  desktop1440: {
    name: 'Desktop 1440px',
    styles: {
      width: '1440px',
      height: '900px'
    },
    type: 'desktop'
  }
};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen', // убирает внутренние отступы Storybook
    viewport: {
      viewports: {
        customViewports,
        defaultViewport: 'desktop1440' // устанавливает 1440px как viewport по умолчанию
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  }
};

export default preview;
