// eslint.config.js
import eslint from 'eslint';
const { defineConfig } = eslint;

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',          // Стандартные правила ESLint
    'plugin:react/recommended',    // Рекомендуемые правила для React (если у вас React)
    'plugin:prettier/recommended' // Включает настройки Prettier
  ],
  plugins: [
    'react',      // Плагин для React
    'prettier',   // Плагин для Prettier
  ],
  rules: {
    'no-console': 'warn',      // Пример правила
    'prettier/prettier': 'error', // Ошибка, если код не соответствует Prettier
  },
});
