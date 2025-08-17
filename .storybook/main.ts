import type { StorybookConfig } from '@storybook/react-vite';
// import { alias } from '../aliases.cjs';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const { alias } = require('../aliases.cjs');
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
