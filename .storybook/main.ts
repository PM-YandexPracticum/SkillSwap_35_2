import type { StorybookConfig } from '@storybook/react-vite';
import { alias } from '../aliases';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = { ...config.resolve.alias, ...alias };
    return config;
  }
};
export default config;
