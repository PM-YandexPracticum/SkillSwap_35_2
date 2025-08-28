const path = require('path');

const alias = {
  '@': path.resolve(__dirname, 'src'),
  '@icons': path.resolve(__dirname, 'src/shared/assets/icons'),
};
module.exports = { alias }
