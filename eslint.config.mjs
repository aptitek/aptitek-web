import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import i18next from 'eslint-plugin-i18next';
import playwright from 'eslint-plugin-playwright';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'storybook-static/**',
      'test-results/**',
      'playwright-report/**',
      '.husky/**',
      'coverage/**',
      '.agents/**',
      '.wireit/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React & React Hooks configuration
  {
    files: ['**/*.{jsx,tsx}'],
    ...eslintPluginReact.configs.flat.recommended,
    ...eslintPluginReact.configs.flat['jsx-runtime'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },

  // React accessibility (a11y)
  {
    files: ['**/*.{jsx,tsx}'],
    ...jsxA11y.flatConfigs.recommended,
  },

  // Astro recommended & Astro accessibility (a11y)
  ...eslintPluginAstro.configs['flat/recommended'],
  ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],

  // Internationalization (i18n)
  {
    files: ['src/**/*.{jsx,tsx}'],
    ...i18next.configs['flat/recommended'],
    rules: {
      'i18next/no-literal-string': 'warn',
    },
  },
  {
    files: [
      'src/**/*.stories.{ts,tsx,js,jsx}',
      '**/*.test.{ts,tsx,js,jsx}',
      '**/*.spec.{ts,tsx,js,jsx}',
    ],
    rules: {
      'i18next/no-literal-string': 'off',
    },
  },

  // Vitest unit & integration tests
  {
    files: ['**/*.test.{ts,tsx,js,jsx}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },

  // Playwright E2E tests
  {
    files: ['tests/**/*.{ts,js}', '**/*.spec.{ts,js}'],
    ...playwright.configs['flat/recommended'],
  },

  // Storybook stories
  ...eslintPluginStorybook.configs['flat/recommended'],

  // Prettier must come last to override formatting rules
  eslintConfigPrettier,
);
