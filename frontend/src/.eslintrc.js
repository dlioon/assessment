const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
